// controller.js
const logger = require('../../utils/logger.js');
const {
    createNewNote,
    getNotes,
    getNote,
    updateNoteId,
    deleteNote
} = require('../service/note.service.js')
// Create and Save a new Note
exports.create = (req, res) => {
    createNewNote(req.body.title, req.body.content).then(data => {
        res.send(data);
    }).catch(err => {
        logger.error(err.message || "Some error occurred while creating the Note.")
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."

        });
    });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    getNotes().then(notes => {
        res.send(notes);
    }).catch(err => {
        logger.error("error 500 while retrieving data")
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    })
};
// Find a single note with a noteId
exports.findOne = (req, res) => {
    getNote(req.params.noteId, (error, resultData) => {
        logger.error("Error retrieving note with id " + req.params.noteId)
        if (error) {
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            })
        }

        if (err.kind === 'ObjectId') {
            logger.error("note not found with id")
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
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
        console.log("this")
        res.send(note);
    }).catch(err => {
        console.log("catch" + err)
        if (err.kind === 'ObjectId') {
            logger.error("note not found with id")
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        logger.error("Error updating note with id " + req.params.noteId)
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    deleteNote(req.params.noteId).then(note => {
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            logger.error("Note not found with id " + req.params.noteId)
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        logger.error("Could not delete note with id " + req.params.noteId)
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId

        });
    });
};
