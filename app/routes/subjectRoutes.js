const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// POST route to add a new subject
router.post('/', subjectController.saveSubject);

// GET route to get all subjects
router.get('/', subjectController.getAllSubjects);

// GET route to get a single subject by sub_code
router.get('/:sub_code', subjectController.getSubjectByCode);

// GET route to get subjects by subject_teacher_id
router.get('/teacher/:subject_teacher_id', subjectController.getSubjectsByTeacher);

// PATCH route to update a subject
router.patch('/:sub_code', subjectController.updateSubject);

// DELETE route to delete a subject
router.delete('/:sub_code', subjectController.deleteSubject);

// POST route to create multiple subjects
router.post('/bulk', subjectController.createMultipleSubjects);

module.exports = router;
