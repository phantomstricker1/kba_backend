const Subject = require('../models/subjectModel');

// POST handler to save subject data
exports.saveSubject = (req, res) => {
    const { sub_name, sub_code, class_group, class_section, subject_teacher, term } = req.body;

    if (!sub_name || !sub_code || !class_group ) {
        return res.status(400).send('All fields are required');
    }

    Subject.create(sub_name, sub_code, class_group, class_section, subject_teacher, term, (err, result) => {
        if (err) {
            console.error('Error saving subject: ', err);
            return res.status(500).send('Error saving subject');
        }

        res.status(200).send('Subject saved successfully');
    });
};

// Controller: Create multiple subjects
exports.createMultipleSubjects = (req, res) => {
    const subjects = req.body.subjects;

    if (!Array.isArray(subjects) || !subjects.length) {
        return res.status(400).send('Invalid input: expected an array of subjects');
    }

    Subject.createMultiple(subjects, (err, result) => {
        if (err) {
            return res.status(500).send('Error saving subjects');
        }
        res.status(200).send(`${result.affectedRows} subjects saved successfully`);
    });
};


// GET handler to retrieve all subjects
exports.getAllSubjects = (req, res) => {
    Subject.findAll((err, results) => {
        if (err) {
            console.error('Error retrieving subjects: ', err);
            return res.status(500).send('Error retrieving subjects');
        }

        res.status(200).json(results);
    });
};

// Controller: Get a single subject by subject code
exports.getSubjectByCode = (req, res) => {
    const { sub_code } = req.params;

    Subject.findByCode(sub_code, (err, result) => {
        if (err) {
            return res.status(500).send('Error retrieving subject');
        }
        if (!result.length) {
            return res.status(404).send('Subject not found');
        }
        res.status(200).json(result[0]);
    });
};

// Controller: Get subjects by subject_teacher_id
exports.getSubjectsByTeacher = (req, res) => {
    const { subject_teacher_id } = req.params;

    Subject.findByTeacherId(subject_teacher_id, (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving subjects');
        }
        res.status(200).json(results);
    });
};

// Controller: Patch subject
exports.updateSubject = (req, res) => {
    const { sub_code } = req.params;
    const { sub_name, class_group, class_section, subject_teacher, term } = req.body;

    Subject.update(sub_code, { sub_name, class_group, class_section, subject_teacher, term }, (err, result) => {
        if (err) {
            return res.status(500).send('Error updating subject');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Subject not found');
        }
        res.status(200).send('Subject updated successfully');
    });
};

// Controller: Delete subject
exports.deleteSubject = (req, res) => {
    const { sub_code } = req.params;

    Subject.delete(sub_code, (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting subject');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Subject not found');
        }
        res.status(200).send('Subject deleted successfully');
    });
};

