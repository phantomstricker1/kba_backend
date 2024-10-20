const Student = require('../models/studentsModel');

exports.getAllStudents = (req, res) => {
    Student.findAll((err, results) => {
        if (err) {
            console.error('Error retrieving data: ', err);
            return res.status(500).send('Error retrieving data');
        }

        res.status(200).json(results);
    });
}