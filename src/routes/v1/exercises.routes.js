const express = require('express');
const router = express.Router();

const exercisesController = require('../../controllers/exercises.controller');

// GET /api/v1/exercises
router.get('/', exercisesController.getExercises);

// GET /api/v1/exercises/:id
router.get('/:id', exercisesController.getExerciseById);

// POST /api/v1/exercises
router.post('/', exercisesController.createExercise);

// PUT /api/v1/exercises/:id
router.put('/:id', exercisesController.updateExercise);

// DELETE /api/v1/exercises/:id
router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;