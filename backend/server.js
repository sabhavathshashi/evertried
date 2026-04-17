const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const geminiRoutes = require('./routes/geminiRoutes');

// Load Schema Models globally prior to socket executions
const Job = require('./models/Job');
const User = require('./models/User');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // For development
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(express.json());
app.use(cors());

// Pass IO to requests explicitly (optional if we don't pass io)
app.set('io', io);

// Global Socket Configuration for Realtime Map
const connectedUsers = new Map(); // map userId to socketId

io.on('connection', (socket) => {
    console.log(`User connected to socket: ${socket.id}`);
    
    // Register worker or employer
    socket.on('register', (userId) => {
        connectedUsers.set(userId, socket.id);
        console.log(`Registered user ${userId} with socket ${socket.id}`);
    });
    
    // Accept or decline job
    socket.on('job_apply', async (data) => {
        try {
            // 1. Add applicant to DB safely
            await Job.findByIdAndUpdate(data.jobId, {
                $addToSet: { applicants: { worker: data.workerId, status: 'applied' } }
            });

            // 2. Transmit comprehensive worker data to Employer
            const worker = await User.findById(data.workerId).select('name rating skills location');
            const employerSocket = connectedUsers.get(data.employerId);
            
            if (employerSocket && worker) {
                io.to(employerSocket).emit('worker_applied', {
                    jobId: data.jobId,
                    workerId: worker._id,
                    name: worker.name,
                    rating: worker.rating,
                    distance: '1.2 km', // Native distance calc pending via GeoJSON
                    skills: worker.skills
                });
            }
        } catch (error) {
            console.error('Apply error:', error);
        }
    });

    socket.on('job_select', async (data) => {
        try {
            // Update Applicant status specifically
            await Job.updateOne(
                { _id: data.jobId, "applicants.worker": data.workerId },
                { $set: { "applicants.$.status": data.status } }
            );

            // Fetch the updated job conditionally to process total hired capacity
            const activeJobObj = await Job.findById(data.jobId);
            if (activeJobObj) {
                 const hiredCount = activeJobObj.applicants.filter(a => a.status === 'hired').length;
                 if (hiredCount >= activeJobObj.workerCount) {
                     activeJobObj.status = 'in-progress';
                     await activeJobObj.save();
                 } else if (activeJobObj.status === 'in-progress' && data.status !== 'hired') {
                     // Re-open job if employer rejects an already hired worker causing drops below capacity
                     activeJobObj.status = 'open';
                     await activeJobObj.save();
                 }
            }

            // Notify worker instantly
            const workerSocket = connectedUsers.get(data.workerId);
            if (workerSocket) {
                io.to(workerSocket).emit('job_confirmation', data);
            }
        } catch(error) {
             console.error('Job select error', error);
        }
    });

    socket.on('disconnect', () => {
        connectedUsers.forEach((value, key) => {
            if(value === socket.id) {
                connectedUsers.delete(key);
                console.log(`User ${key} disconnected`);
            }
        });
    });
});

app.set('connectedUsers', connectedUsers); // To use in controllers

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/contract', require('./routes/contractRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes')); // Dynamic Dashboard Hub

// Basic Route for quick test
app.get('/api/health', (req, res) => {
    res.json({ message: 'EverTried Engine is running!' });
});

// Port and Server Start
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
