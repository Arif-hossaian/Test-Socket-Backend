const LaunchModel = require('../../controller/launch/launchController');

const LaunchController = {
  async createLaunch(req, res, next) {
    try {
      await LaunchModel.ensureTableExists();
      const { launchName, creatorId, status, launchDescription } = req.body;
      const launch = await LaunchModel.create({
        launchName,
        creatorId,
        status,
        launchDescription,
      });
      res.status(201).json(launch);
    } catch (error) {
      next(error);
    }
  },

  async getAllLaunches(req, res, next) {
    try {
      const launches = await LaunchModel.getAll();
      res.status(200).json(launches);
    } catch (error) {
      next(error);
    }
  },

  async getLaunchById(req, res, next) {
    try {
      const { id } = req.params;
      const launch = await LaunchModel.getById(id);
      if (!launch) return res.status(404).json({ error: 'Launch not found' });
      res.status(200).json(launch);
    } catch (error) {
      next(error);
    }
  },

  async updateLaunch(req, res, next) {
    try {
      const { id } = req.params;
      const { launchName, status, launchDescription } = req.body;
      const updatedLaunch = await LaunchModel.update(id, {
        launchName,
        status,
        launchDescription,
      });
      if (!updatedLaunch)
        return res.status(404).json({ error: 'Launch not found' });
      res.status(200).json(updatedLaunch);
    } catch (error) {
      next(error);
    }
  },

  async deleteLaunch(req, res, next) {
    try {
      const { id } = req.params;
      const deletedLaunch = await LaunchModel.delete(id);
      if (!deletedLaunch)
        return res.status(404).json({ error: 'Launch not found' });
      res.status(200).json({ message: 'Launch deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = LaunchController;
