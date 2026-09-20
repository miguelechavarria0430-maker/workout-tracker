const express = require('express');
const router = express.Router();

const progressController = require('../../controllers/progress.controller');

// GET /api/v1/progress
router.get('/', progressController.getProgress);

// GET /api/v1/progress/:id
router.get('/:id', progressController.getProgressById);

// POST /api/v1/progress
router.post('/', progressController.createProgress);

// PUT /api/v1/progress/:id
router.put('/:id', progressController.updateProgress);

// DELETE /api/v1/progress/:id
router.delete('/:id', progressController.deleteProgress);

module.exports = router;