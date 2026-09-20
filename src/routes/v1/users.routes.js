const express = require('express');
const router = express.Router();

const usersController = require('../../controllers/users.controller');

// GET /api/v1/users
router.get('/', usersController.getUsers);

// GET /api/v1/users/:id
router.get('/:id', usersController.getUserById);

// POST /api/v1/users
router.post('/', usersController.createUser);

// PUT /api/v1/users/:id
router.put('/:id', usersController.updateUser);
// PATCH /api/v1/users/:id
router.patch('/:id', usersController.updateUserPartial);
// DELETE /api/v1/users/:id
router.delete('/:id', usersController.deleteUser);

module.exports = router;