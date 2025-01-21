// routes/serviceRoutes.js
const express = require('express');
const serviceController = require('../controller/serviceController');

const router = express.Router();

// Define the POST route for creating a service
router.post('/services', serviceController.createService);

module.exports = router;
