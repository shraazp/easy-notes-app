//note.service.js
const {createNote,findAllNotes,findNote,updateNote,deleteById} = require('../models/note.model.js');

const createNewNote = (title,content)=>{
    //function call to create a new note with the given title and content
    let note = createNote(title,content)    
    return note
}

//query to find all notes
const getNotes = () =>{
    return findAllNotes()
}

//query to find a single note
const getNote = (findId,callback) => {
    findNote(findId,(error,data)=>{
        return (error)?callback(error):callback(data);
    })
}

// Find note and update it with the request body
const updateNoteId = (findId,title,content) => {

    return updateNote(findId,title,content)}

//query to delete a note
const deleteNote = (findId) => {
    return deleteById(findId)
}

module.exports = {createNewNote,getNotes,getNote,updateNoteId,deleteNote}