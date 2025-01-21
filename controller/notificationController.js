const {
  getAllNotifications,
  saveNotification,
} = require('../models/notificationModel');

const fetchNotifications = async (req, res) => {
  try {
    const notifications = await getAllNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createNotification = async (req, res, io) => {
  try {
    const { message } = req.body;
    const notification = await saveNotification(message);

    // Broadcast notification to all connected clients
    io.emit('notification', notification);

    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { fetchNotifications, createNotification };
