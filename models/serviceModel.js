// models/serviceModel.js
const pool = require('../config/db');

// Model to create a service entry
const createService = async (startTime, endTime, description) => {
  try {
    const query =
      'INSERT INTO services(start_time, end_time, description) VALUES ($1, $2, $3) RETURNING *';
    const values = [startTime, endTime, description];

    const result = await pool.query(query, values);
    return result.rows[0]; // Return the created service
  } catch (error) {
    console.error('Database error:', error.message); // Log the error for debugging
    throw new Error('Error creating service'); // Re-throw with context
  }
};

module.exports = { createService };
