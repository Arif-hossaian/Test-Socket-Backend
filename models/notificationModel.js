const pool = require('../config/db');

// Create a new notification
const createNotification = async (serviceId, message) => {
  try {
    // Ensure that the notifications table exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        service_id INT NOT NULL,
        message TEXT NOT NULL,
        service_msg TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Run the query to create the table if it doesn't exist
    await pool.query(createTableQuery);

    // Insert the new notification into the notifications table
    const query = `
      INSERT INTO notifications (service_id, message, service_msg)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [serviceId, message, null]; // serviceMsg is assumed to be optional
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating notification:', error);
    throw new Error('Error creating notification');
  }
};

// Fetch all notifications
const getNotifications = async () => {
  try {
    const query = 'SELECT * FROM notifications ORDER BY created_at DESC;';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching notifications');
  }
};

module.exports = { createNotification, getNotifications };
