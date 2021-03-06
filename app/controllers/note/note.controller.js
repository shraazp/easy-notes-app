// controller.js
const { application } = require('express');
const logger = require('../../../utils/logger.js');
const {
    createNewNote,
    getNotes,
    getNote,
    updateNoteId,
    deleteNote,
  
} = require('../../service/note.service.js')
const dtoObject = require("./note.responseSchema");
let responseObject;

// Create and Save a new Note
exports.create = (req, res) => {
 let filename= (req.file===undefined)?(undefined):(req.file.filename)
    createNewNote(req.body.title, req.body.content,req.body.userId,req.body.color,filename).then(data => {
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
    getNotes(req.body.userId).then(notes => {
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
    getNote(req.body.userId,req.params.noteId).then(note => {
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
// Update a note identified by the noteId in the request
exports.update = (req, res) => { // Find note and update it with the request body
    let id = req.params.noteId
    let title = req.body.title
    let content = req.body.content
    let trash=req.body.isTrash
    let color=req.body.color
    let filename= (req.file===undefined)?(undefined):(req.file.filename)
    updateNoteId(req.body.userId,id, title, content,trash,color,filename).then(note => {
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
    deleteNote(req.body.userId,req.params.noteId).then(note => {
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
