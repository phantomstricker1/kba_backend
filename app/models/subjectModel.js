const db = require('../config/dbPool');

const Subject = {
    // Create a new subject
    create: (sub_name, sub_code, class_group, class_section, subject_teacher, term, callback) => {
        const query = 'INSERT INTO subjects (sub_name, sub_code, class_group, class_section, subject_teacher, term) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [sub_name, sub_code, class_group, class_section, subject_teacher, term];

        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Get a single subject by its code
    findByCode: (sub_code, callback) => {
        const query = 'SELECT * FROM subjects WHERE sub_code = ?';
        db.query(query, [sub_code], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Get all subjects by teacher id (assuming subject_teacher is stored as an id)
    findByTeacherId: (subject_teacher_id, callback) => {
        const query = 'SELECT * FROM subjects WHERE subject_teacher_id = ?';
        db.query(query, [subject_teacher_id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Update a subject by its code
    update: (sub_code, data, callback) => {
        const query = `
            UPDATE subjects 
            SET sub_name = ?, class_group = ?, class_section = ?, subject_teacher = ?, term = ?
            WHERE sub_code = ?
        `;
        const values = [data.sub_name, data.class_group, data.class_section, data.subject_teacher, data.term, sub_code];

        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Delete a subject by its code
    delete: (sub_code, callback) => {
        const query = 'DELETE FROM subjects WHERE sub_code = ?';
        db.query(query, [sub_code], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Create multiple subjects
    createMultiple: (subjects, callback) => {
        const query = 'INSERT INTO subjects (sub_name, sub_code, class_group, class_section, subject_teacher, term) VALUES ?';
        const values = subjects.map(subject => [
            subject.sub_name,
            subject.sub_code,
            subject.class_group,
            subject.class_section,
            subject.subject_teacher,
            subject.term
        ]);

        db.query(query, [values], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Get all subjects
    findAll: (callback) => {
        const query = 'SELECT * FROM subjects';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Subject;
