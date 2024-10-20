// const db = require('../config/db');
const db = require('../config/dbPool');

const User = {

    create: (roll_no, name, email, pass, role, isActive, callback) => {
        const query = `
            INSERT INTO users (roll_no, name, email, pass, role, isActive, created, modified) 
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
        const values = [roll_no, name, email, pass, role, isActive];

        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });

    },

    findAll: (callback) => {
        const query = 'SELECT id, roll_no, name, email, role, isActive, created, modified FROM users';

        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);``
        });

    },

    findByRollNo: (roll_no, callback) => { 
        const query = 'SELECT * FROM users WHERE roll_no = ?';
        db.query(query, [roll_no], (err, results) => {
            if (err) {
                return callback(err);
            }

            callback(null, results[0]);
        });
    },

    updateByRollNo: (roll_no, updatedData, callback) => {
        const query = 'UPDATE users SET ? WHERE roll_no = ?';
        db.query(query, [updatedData, roll_no], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },
    
    modifyByRollNo: (roll_no, updates, callback) => {
        
        const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updates);
    
        const query = `UPDATE users SET ${fields}, modified = CURRENT_TIMESTAMP WHERE roll_no = ? LIMIT 1`; 
        values.push(roll_no); 
    
        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    deleteByRollNo: (roll_no, callback) => {
        const query = 'DELETE FROM users WHERE roll_no = ?';
        db.query(query, [roll_no], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

};

module.exports = User;
