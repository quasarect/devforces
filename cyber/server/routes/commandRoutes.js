// routes/commandRoutes.js
const express = require('express');
const router = express.Router();
const { runCommand } = require('../controllers/commandController'); // Make sure the path is correct

router.post('/', runCommand); // Ensure this is correctly defined

module.exports = router; // Ensure this line is present
