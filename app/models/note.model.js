const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String
}, {timestamps: true});
const Note = mongoose.model('Note', NoteSchema);
// Create a Note
const createNote = (title, content) => {
    const note = new Note({title: title, content: content});
    // Save Note in the database
    return note.save()
};
// find all notes
const findAllNotes = () => {
    return Note.find()
}
// query to find a single note
const findNote = (findId, callback) => {
    Note.findById(findId, (error, data) => {
        return(error) ? callback(error) : callback(data);
    })
}
// Find note and update it with the request body
const updateNote = (findId, title, content) => {
    return Note.findByIdAndUpdate(findId, {
        title: title,
        content: content
    }, {new: true})
}
// query to delete a note
const deleteById = (findId) => {
    return Note.findByIdAndRemove(findId)
}
module.exports = {
    createNote,
    findAllNotes,
    findNote,
    updateNote,
    deleteById
}
