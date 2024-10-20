const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 
// const JWT_SECRET = 'kba'; 

exports.testapi = (req, res) => {
    res.status(200).send("Connected");
}

// * Login user
exports.loginUser = (req, res) => {
    const { roll_no, pass } = req.body; 

    if (!roll_no || !pass) {
        return res.status(400).send('Please provide roll number and password');
    }

    User.findByRollNo(roll_no, (err, user) => {
        if (err || !user) {
            return res.status(404).send('User not found');
        }

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(pass, user.pass, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(400).send('Invalid password');
            }

            // Create a JWT token with 24 hours expiration
            const token = jwt.sign({ id: user.id, roll_no: user.roll_no, role: user.role }, JWT_SECRET, { expiresIn: '24h' });


            res.status(200).json({
                message: 'Login successful',
                token,
                result: user
            });
        });
    });
};

// * Register single user
exports.saveUser = (req, res) => {
    const { roll_no, name, email, pass, role, isActive } = req.body;

    // Validate the required fields
    if (!roll_no || !name || !email || !pass || !role) {
        return res.status(400).send('Please provide roll_no, name, email, pass and role');
    }

    bcrypt.hash(pass, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        // Save the user with the hashed password
        User.create(roll_no, name, email, hashedPassword, role, isActive, (err, result) => {
            if (err) {
                console.error('Error saving data: ', err);
                return res.status(500).json({
                    result: 'Error saving data',
                    message: err.sqlMessage
                });
            }
            res.status(200).json({
                message: 'User saved successfully',
                result: result
            });
        });
    });

};

// * Register multiple users
exports.saveMultipleUsers = (req, res) => {
    const users = req.body; // Expecting an array of user objects

    // Validate if users array is provided
    if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).send('Please provide an array of users');
    }

    // Process each user
    const userPromises = users.map(user => {
        const { roll_no, name, email, pass, role, isActive } = user;

        // Validate the required fields for each user
        if (!roll_no || !name || !email || !pass || !role) {
            return Promise.reject('Please provide roll_no, name, email, pass, and role for all users');
        }

        return new Promise((resolve, reject) => {
            bcrypt.hash(pass, 10, (err, hashedPassword) => {
                if (err) {
                    return reject('Error hashing password');
                }

                // Save the user with the hashed password
                User.create(roll_no, name, email, hashedPassword, role, isActive, (err, result) => {
                    if (err) {
                        console.error('Error saving data: ', err);
                        return reject({
                            result: 'Error saving data',
                            message: err.sqlMessage
                        });
                    }
                    resolve(result);
                });
            });
        });
    });

    // Wait for all user promises to complete
    Promise.all(userPromises)
        .then(results => {
            res.status(200).json({
                message: 'Users saved successfully',
                results: results
            });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            });
        });
};

// * Get user by Roll no
exports.getUserByRollNo = (req, res) => {
    const { roll_no } = req.params;

    if (!roll_no) {
        return res.status(400).send('Please provide a roll number');
    }

    User.findByRollNo(roll_no, (err, user) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).send('Error retrieving user');
        }

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json({
            message: 'User fetched successfully',
            data: user
        });
    });
};

// * Get All users
exports.getAllUsers = (req, res) => {
    User.findAll((err, results) => {
        if (err) {
            console.error('Error retrieving data: ', err);
            return res.status(500).send('Error retrieving data');
        }

        res.status(200).json(results);
    });

};

// Update a user by roll_no
exports.updateUserByRollNo = (req, res) => {
    const { roll_no } = req.params;
    const { name, email, role, isActive } = req.body;

    if (!roll_no) {
        return res.status(400).send('Please provide a roll number');
    }

    // Construct query for updating user fields
    const updatedData = {
        name: name,
        email: email,
        role: role,
        isActive: isActive
    };

    User.updateByRollNo(roll_no, updatedData, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).send('Error updating user');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User updated successfully');
    });
};

// Modify a user by roll_no (PATCH request)
exports.modifyUserByRollNo = (req, res) => {
    const { roll_no } = req.params;
    const updates = req.body;

    if (!roll_no) {
        return res.status(400).send('Please provide a roll number');
    }

    // Ensure there's at least one field to update
    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).send('No updates provided');
    }

    User.modifyByRollNo(roll_no, updates, (err, result) => {
        if (err) {
            console.error('Error modifying user:', err);
            return res.status(500).send('Error modifying user');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User modified successfully');
    });
};

// Controller to delete a user by roll_no
exports.deleteUserByRollNo = (req, res) => {
    const { roll_no } = req.params;

    if (!roll_no) {
        return res.status(400).send('Please provide a roll number');
    }

    User.deleteByRollNo(roll_no, (err, result) => { 
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).send('Error deleting user');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User deleted successfully');
    });
};