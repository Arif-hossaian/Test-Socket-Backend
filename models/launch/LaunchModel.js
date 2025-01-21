const db = require('../../config/db');

const LaunchModel = {
  async ensureTableExists() {
    const query = `
          CREATE TABLE IF NOT EXISTS launches (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            launch_name VARCHAR(255) NOT NULL,
            creator_id UUID NOT NULL,
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(50) NOT NULL CHECK (status IN ('OFFLINE', 'ONLINE', 'TERMINATED', 'UNDER_CONSTRUCTION', 'NOT_AVAILABLE')),
            is_deleted BOOLEAN DEFAULT FALSE,
            launch_description TEXT
          );
        `;
    await db.query(query);
  },
  async create({ launchName, creatorId, status, launchDescription }) {
    const query = `
      INSERT INTO launches (launch_name, creator_id, status, launch_description)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [launchName, creatorId, status, launchDescription];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async getAll() {
    const query = `SELECT * FROM launches WHERE is_deleted = FALSE ORDER BY creation_date DESC;`;
    const { rows } = await db.query(query);
    return rows;
  },

  async getById(id) {
    const query = `SELECT * FROM launches WHERE id = $1 AND is_deleted = FALSE;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },

  async update(id, { launchName, status, launchDescription }) {
    const query = `
      UPDATE launches
      SET launch_name = $1, status = $2, launch_description = $3
      WHERE id = $4 AND is_deleted = FALSE
      RETURNING *;
    `;
    const values = [launchName, status, launchDescription, id];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async delete(id) {
    const query = `UPDATE launches SET is_deleted = TRUE WHERE id = $1 RETURNING *;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },
};

module.exports = LaunchModel;
