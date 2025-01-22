const db = require('../../config/db');

const UserModel = {
  async ensureTableExists() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'MODERATOR')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE
      );
    `;
    await db.query(query);
  },

  async create({ username, email, password, role }) {
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role, created_at;
    `;
    const values = [username, email, password, role];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async findById(id) {
    const query = `SELECT id, username, email, role, is_active, created_at FROM users WHERE id = $1;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const { rows } = await db.query(query, [email]);
    return rows[0];
  },

  async update(id, { username, email, role, isActive }) {
    const query = `
      UPDATE users
      SET username = $1, email = $2, role = $3, is_active = $4
      WHERE id = $5
      RETURNING id, username, email, role, is_active, created_at;
    `;
    const values = [username, email, role, isActive, id];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async delete(id) {
    const query = `DELETE FROM users WHERE id = $1 RETURNING id;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },
};

module.exports = UserModel;
