const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    requiredSkills: [{
        type: String,
        required: true
    }],
    workerCount: {
        type: Number,
        required: true,
        min: 1
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'completed', 'cancelled'],
        default: 'open'
    }
}, {
    timestamps: true
});

// Index location for finding nearby jobs
jobSchema.index({ location: '2dsphere' });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
