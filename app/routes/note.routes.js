const express = require('express')
const router = express.Router() // middleware creates route handler
const notes = require('../controllers/note/note.controller.js');
const validation = require('../middleware/note.middleware.js')
// Create a new Note
router.post('/', validation.authenticateJWT,validation.validate, notes.create);
// Retrieve all Notes
router.get('/', validation.authenticateJWT,notes.findAll);
// Retrieve a single Note with noteId
router.get('/:noteId',validation.authenticateJWT, notes.findOne);
// Update a Note with noteId
router.put('/:noteId', validation.authenticateJWT,validation.validate, notes.update);
// Delete a Note with noteId
router.delete('/:noteId', validation.authenticateJWT,notes.delete);
module.exports = router
