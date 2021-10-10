const logger = require('../../utils/logger.js');
const {createNewNote,findAllNotes,findNote,updateNote,deleteById} =require('../service/note.service.js')
// Create and Save a new Note
exports.create = (req, res) => {
    createNewNote(req.body.title || "Untitled Note",req.body.content)
    .then(data => {
        logger.info(`a new entry is added`)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });     
    });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    findAllNotes()
    .then(notes => {
        logger.info("show all the notes from database")
        res.send(notes);
    }).catch(err => {
        logger.error("error 500 while retrieving data")
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });     
    });
};
// Find a single note with a noteId
exports.findOne = (req, res) => {
    findNote(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            logger.error("note not found with id")
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
        
    });
};
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    let id = req.params.noteId
    let title= req.body.title
    let content= req.body.content
    updateNote(id,title,content)
    .then(note => {
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            logger.error("note not found with id")
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
   deleteById(req.params.noteId)
    .then(note => {
        if(!note) {
            logger.error("note not found with id")
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        logger.info("Note deleted successfully!")
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
            
        });
    });
};