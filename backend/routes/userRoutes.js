const express = require('express');
const router = express.Router();
const { updateSkills, completeJob } = require('../controllers/userController');

// Define routes
router.post('/update-skills', updateSkills);
router.post('/complete-job', completeJob);

module.exports = router;
