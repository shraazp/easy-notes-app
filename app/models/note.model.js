const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User=require('./user.model')
const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    userId: [{ type: Schema.Types.ObjectId, ref: User }]
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
    return Note.find().populate('userId')
}
// query to find a single note
const findNote = (findId) => {
 return  Note.findById(findId).populate('userId')
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
