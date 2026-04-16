const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route imports
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobRoutes);

// Basic Route for quick test
app.get('/api/health', (req, res) => {
    res.json({ message: 'EverTried Engine is running!' });
});

// Port and Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
