const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require('../middlewares/jwtAuth');
const authorizeRole = require('../middlewares/roleAuth');

const studentController = require("../controllers/studentController");

router.get('/test', userController.testapi);

router.get('/student', studentController.getAllStudents);


// POST route for user login
router.post('/login', userController.loginUser);

// POST route to register user data
router.post('/register', userController.saveUser);

// POST route to save multiple users
router.post('/users/bulk', authenticateToken, authorizeRole(['admin']), userController.saveMultipleUsers);

// GET route to retrieve a single user by roll_no
router.get('/user/:roll_no', userController.getUserByRollNo);

// GET route to retrieve all users
router.get('/users', userController.getAllUsers);

// PUT route to update user by roll_no
router.put('/user/:roll_no', userController.updateUserByRollNo);

// PATCH route to update a single user by roll_no
router.patch('/user/:roll_no', userController.modifyUserByRollNo);

// DELETE route to delete user by roll_no
router.delete('/user/:roll_no', userController.deleteUserByRollNo);

module.exports = router;