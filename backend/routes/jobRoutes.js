const express = require('express');
const router = express.Router();
const { createJobAndMatch } = require('../controllers/jobController');

// Define routes
router.post('/create', createJobAndMatch);

module.exports = router;
