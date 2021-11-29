const mongoose = require('mongoose');

/**
 * Schema declared for notes userId is refered from User schema
 */
 
const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isTrash:Boolean,
    color:String,
    profileImg: {
        type: String
    }
}, {timestamps: true});

const Note = mongoose.model('Note', NoteSchema);
/**
 * function to create a note in the database
 * @param {Object} title 
 * @param {Object} content 
 * @param {next} userId 
 * @returns promise 
 */
const createNote = (title, content, userId,color,filename) => {
console.log(filename)
    const note = new Note({title: title, content: content, userId: userId,isTrash:false,color:color,profileImg:filename});
    return note.save()
};
/**
 * function to get all notes
 * @param {Object} userId 
 * @returns a promise consisting of all notes
 */
const findAllNotes = (userId) => {
    return Note.find({userId: userId}).populate({
        path: "userId",
        select: ["firstName", "lastName", "email"]
    })
}
/**
 * function to get a particular note of a user using note id
 * @param {Object} userId 
 * @param {Object} findId 
 * @returns promise consisting of single note
 */
const findNote = (userId, findId) => {
    return Note.findById({userId: userId, _id: findId})
}
/**
 * function to update already existing note
 * @param {Object} userId 
 * @param {Object} findId 
 * @param {Object} title 
 * @param {Object} content 
 * @returns promise with updated note 
 */
const updateNote = (userId, findId, title, content,trash,color,filename) => {
    return Note.findOneAndUpdate({
        userId: userId,
        _id: findId
    }, {
        title: title,
        content: content,
        isTrash:trash,
        color:color,
        profileImg:filename
    }, {new: true})
}
/**
 * function to delete a note with userID
 * @param {Object} userId 
 * @param {Object} findId 
 * @returns promise with message successsfully deleted
 */
const deleteById = (userId, findId) => {
    return Note.findOneAndRemove({userId: userId, _id: findId})
}


module.exports = {
    createNote,
    findAllNotes,
    findNote,
    updateNote,
    deleteById,
  
}
