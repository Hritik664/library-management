const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to add a new user
router.post('/add', userController.addUser);

module.exports = router;
