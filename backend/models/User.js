const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['worker', 'employer'], required: true },
    skills: [{
        name: { type: String, required: true },
        experience: { type: Number, min: 0, default: 0 },
        rating: { type: Number, default: 0 }
    }],
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
    },
    availability: { type: Boolean, default: true },
    rating: { type: Number, default: 0 }
}, { timestamps: true });

userSchema.index({ location: '2dsphere' });
userSchema.index({ "skills.name": 1 });

module.exports = mongoose.model('User', userSchema);
