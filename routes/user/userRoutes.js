const express = require('express');
const UserController = require('../../controller/user/userController');
const router = express.Router();

router.post('/crt', UserController.createUser);
router.get('/src/:id', UserController.getUserById);
router.put('/src/updt/:id', UserController.updateUser);
router.delete('/src/dlt/:id', UserController.deleteUser);

module.exports = router;
