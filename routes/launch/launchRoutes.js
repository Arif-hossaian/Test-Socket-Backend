const express = require('express');
const LaunchController = require('../../controller/launch/launchController');
const router = express.Router();

router.post('/crt', LaunchController.createLaunch);
router.get('/src/al', LaunchController.getAllLaunches);
router.get('/src/:id', LaunchController.getLaunchById);
router.put('/src/updt:id', LaunchController.updateLaunch);
router.delete('/src/dlt/:id', LaunchController.deleteLaunch);

module.exports = router;
