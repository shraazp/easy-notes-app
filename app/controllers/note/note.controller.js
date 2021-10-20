// controller.js
const logger = require('../../../utils/logger.js');
const {
    createNewNote,
    getNotes,
    getNote,
    updateNoteId,
    deleteNote
} = require('../../service/note.service.js')
const dtoObject = require("./note.responseSchema");
let responseObject;
// Create and Save a new Note
exports.create = (req, res) => {
    createNewNote(req.body.title, req.body.content).then(data => {
        responseObject = dtoObject.noteApiSuccess;
        responseObject.message = data;
        res.send(responseObject);
    }).catch(err => {
        logger.error(err.message)
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
    });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    getNotes().then(notes => {
        res.send(notes);
    }).catch(err => {
        logger.error(err.message)
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
    })
};
// Find a single note with a noteId
exports.findOne = (req, res) => {
    getNote(req.params.noteId, (error, resultData) => {
        logger.error("Error retrieving note with id " + req.params.noteId)
        if (error) {
            logger.error(error.message)
            responseObject = dtoObject.noteApiFailure;
            responseObject.message = error.message;
            return res.send(responseObject);
        }

        if (error.kind === 'ObjectId') {
            logger.error("note not found with id")
            responseObject = dtoObject.noteApiFindFailure;
            responseObject.message = error.message;
            return res.send(responseObject);
        }
        res.send(resultData);
    })

};
// Update a note identified by the noteId in the request
exports.update = (req, res) => { // Find note and update it with the request body
    let id = req.params.noteId
    let title = req.body.title
    let content = req.body.content
    updateNoteId(id, title, content).then(note => {
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            logger.error("note not found with id")
            responseObject = dtoObject.noteApiFindFailure;
            responseObject.message = err.message;
            res.send(responseObject);
        }
        logger.error("note not found with id")
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
    });
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    deleteNote(req.params.noteId).then(note => {
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            logger.error("Note not found with id " + req.params.noteId)
            responseObject = dtoObject.noteApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);
        }
        logger.error("note not found with id")
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
    });
};
