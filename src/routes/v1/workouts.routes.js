const express = require('express');
const router = express.Router();

const workoutsController = require('../../controllers/workouts.controller');

// GET /api/v1/workouts
router.get('/', workoutsController.getWorkouts);

// GET /api/v1/workouts/:id
router.get('/:id', workoutsController.getWorkoutById);

// POST /api/v1/workouts
router.post('/', workoutsController.createWorkout);

// PUT /api/v1/workouts/:id
router.put('/:id', workoutsController.updateWorkout);

// DELETE /api/v1/workouts/:id
router.delete('/:id', workoutsController.deleteWorkout);

module.exports = router;