const db = require('../config/dbPool');

const Students = {
    findAll: (callback) => {
        const query = 'SELECT * FROM students';

        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);``
        });

    },
};

module.exports = Students;