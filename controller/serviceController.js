const serviceModel = require('../models/serviceModel');
const notificationModel = require('../models/notificationModel');

// Controller function to handle the creation of a new service
const createService = async (req, res) => {
  const { startTime, endTime, description } = req.body;

  try {
    // Step 1: Create the service
    const service = await serviceModel.createService(
      startTime,
      endTime,
      description
    );
    console.log('Created service:', service);

    // Step 2: Create a notification
    const message = 'A new service has been created';
    const notifyObj = await notificationModel.createNotification(
      service.id,
      message,
      service.description
    );
    console.log('Notification created:', notifyObj);

    // Step 3: Emit notification using socket.io to all connected clients
    const io = req.app.get('socketio'); // Access io from app
    io.emit('newService', {
      message,
      service,
      notification: notifyObj, // You can send the notification object here
    });

    // Step 4: Send the response to the client
    res.status(201).json({
      message: 'Service created successfully',
      service,
      notification: notifyObj, // Optionally send notification data in the response
      serviceMsg: service.description,
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
};

module.exports = { createService };
