//note.service.js
const {createNote,findAllNotes,findNote,updateNote,deleteById} = require('../models/note.model.js');

const createNewNote = (title,content,userId,color,filename)=>{
    //function call to create a new note with the given title and content
    let note = createNote(title,content,userId,color,filename)    
    return note
}

//query to find all notes
const getNotes = (userId) =>{
    return findAllNotes(userId)
}

//query to find a single note
const getNote = (userId,findId) => {
  return  findNote(userId,findId)
}

// Find note and update it with the request body
const updateNoteId = (userId,findId,title,content,trash,color,filename) => {

    return updateNote(userId,findId,title,content,trash,color,filename)}

//query to delete a note
const deleteNote = (userId,findId) => {
    return deleteById(userId,findId)
}


module.exports = {createNewNote,getNotes,getNote,updateNoteId,deleteNote}