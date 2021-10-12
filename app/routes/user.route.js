const express = require('express')
const routerUser = express.Router() // middleware creates route handler
const users = require('../controllers/user.controller.js');
//const validate = require('../middleware/note.middleware.js')
// Create a new Note
routerUser.post('/', users.create);
// Retrieve all Notes
routerUser.get('/', users.findAll);
// Retrieve a single Note with noteId
routerUser.get('/:userId', users.findOne);
// Update a Note with noteId
routerUser.put('/:userId', users.update);
// Delete a Note with noteId
routerUser.delete('/:userId', users.delete);
module.exports = routerUser
