const User = require('../models/User');

// @desc    Update worker skills
// @route   POST /api/users/update-skills
// @access  Public (Will be protected later)
const updateSkills = async (req, res) => {
    try {
        const { userId, skills } = req.body;

        if (!userId || !skills) {
            return res.status(400).json({ message: 'User ID and skills are required' });
        }

        // Must limit to 10 skills based on instructions
        if (skills.length > 10) {
            return res.status(400).json({ message: 'Maximum 10 skills allowed per worker' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'worker') {
            return res.status(400).json({ message: 'Only workers can update skills' });
        }

        user.skills = skills;
        await user.save();

        res.json({ message: 'Skills updated successfully', skills: user.skills });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating skills' });
    }
};

// @desc    Complete job and update rating
// @route   POST /api/users/complete-job
// @access  Public (Will be protected later)
const completeJob = async (req, res) => {
    try {
        const { workerId, rating } = req.body;

        if (!workerId || rating === undefined) {
            return res.status(400).json({ message: 'Worker ID and rating are required' });
        }

        const worker = await User.findById(workerId);

        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        // Update average rating logic (simplified vs actual moving average for brevity, based on instructions)
        worker.rating = worker.rating === 0 ? rating : (worker.rating + rating) / 2;
        await worker.save();

        res.json({ message: 'Job completed & rating updated', rating: worker.rating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error completing job' });
    }
};

module.exports = {
    updateSkills,
    completeJob
};
