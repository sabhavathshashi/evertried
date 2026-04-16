const Job = require('../models/Job');
const User = require('../models/User');

// Helper function to rank workers based on instructions
const rankWorkers = (workers) => {
    return workers.sort((a, b) => {
        // Find max experience amongst their skills for a general metric, or average it.
        // Assuming we look at general experience length here, simplified.
        const getExp = w => w.skills.reduce((acc, curr) => acc + curr.experience, 0);

        const scoreB = (b.rating * 0.5) + (b.skills.length * 0.3) + (getExp(b) * 0.2);
        const scoreA = (a.rating * 0.5) + (a.skills.length * 0.3) + (getExp(a) * 0.2);
        
        return scoreB - scoreA;
    });
};

// @desc    Create a new job and find matching workers
// @route   POST /api/jobs/create
// @access  Public (Will be protected later)
const createJobAndMatch = async (req, res) => {
    try {
        const { employer, title, requiredSkills, workerCount, location } = req.body;

        // 1. Create Job
        const job = new Job({
            employer,
            title,
            requiredSkills,
            workerCount,
            location: {
                type: 'Point',
                coordinates: location.coordinates // Expected [lng, lat]
            }
        });

        await job.save();

        // 2. AI Matching Engine (Core Logic)
        // Find available workers within 5km who have the required skills
        const maxDistanceInMeters = 5000; // 5 km

        let matchedWorkers = await User.find({
            role: 'worker',
            availability: true,
            'skills.name': { $in: requiredSkills },
            location: {
                $near: {
                    $geometry: {
                         type: "Point",
                         coordinates: location.coordinates
                    },
                    $maxDistance: maxDistanceInMeters
                }
            }
        });

        // 3. Rank the workers
        const rankedWorkers = rankWorkers(matchedWorkers);

        res.status(201).json({
            message: 'Job created and matching workers found',
            job,
            matchingWorkersCount: rankedWorkers.length,
            workers: rankedWorkers
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating job' });
    }
};

module.exports = {
    createJobAndMatch
};
