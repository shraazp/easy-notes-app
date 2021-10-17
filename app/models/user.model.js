const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    firstName: {type:String,required:true},
    lastName: String,
    password: {type:String,required:true},
    phoneNumber: String,
    email: {type:String,required:true}
}, {timestamps: true});
const User = mongoose.model('User', UserSchema);
// create a user
const createUser = (userDetails) => {
    const user = new User({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        password: userDetails.password,
        phoneNumber: userDetails.phoneNumber,
        email: userDetails.email
    })
    return user.save()
}
// find all notes
const findAllUsers = () => {
    return User.find()
}
// query to find a single note
const findUser = (findId, callback) => {
    User.findById(findId, (error, data) => {
        return(error) ? callback(error) : callback(data);
    })
}
// Find note and update it with the request body
const updateUser = (findId, userDetails) => {
    return User.findByIdAndUpdate(findId, {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        password: userDetails.password,
        phoneNumber: userDetails.phoneNumber,
        email: userDetails.email
    })
};
// query to delete a note
const deleteById = (findId) => {
    return User.findByIdAndRemove(findId)
}
module.exports = {
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById
}
