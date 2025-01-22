const UserModel = require('../../models/user/userModel');

const UserController = {
  async createUser(req, res, next) {
    try {
      const { username, email, password, role } = req.body;

      // Ensure the users table exists
      await UserModel.ensureTableExists();

      // Hash the password (using bcrypt or similar library)
      // const bcrypt = require('bcrypt');
      // const passwordHash = await bcrypt.hash(password, 10);

      // Create user
      const user = await UserModel.create({
        username,
        email,
        password,
        role,
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, role, isActive } = req.body;
      const updatedUser = await UserModel.update(id, {
        username,
        email,
        role,
        isActive,
      });
      if (!updatedUser)
        return res.status(404).json({ error: 'User not found' });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const deletedUser = await UserModel.delete(id);
      if (!deletedUser)
        return res.status(404).json({ error: 'User not found' });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
