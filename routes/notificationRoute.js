// routes/notificationRoutes.js
const express = require('express');
const notificationModel = require('../models/notificationModel');

const router = express.Router();

// Endpoint to fetch all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await notificationModel.getNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

module.exports = router;
