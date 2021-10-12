const express = require('express')
const router = express.Router() // middleware creates route handler
const notes = require('../controllers/note.controller.js');
const validate = require('../middleware/note.middleware.js')
// Create a new Note
router.post('/', validate, notes.create);
// Retrieve all Notes
router.get('/', notes.findAll);
// Retrieve a single Note with noteId
router.get('/:noteId', notes.findOne);
// Update a Note with noteId
router.put('/:noteId', validate, notes.update);
// Delete a Note with noteId
router.delete('/:noteId', notes.delete);
module.exports = router
