const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
}, {timestamps: true});
const User = mongoose.model('User', UserSchema);
// login a user
loginUser = (userDetails) => {
    return User.findOne({email: userDetails.email}).then((data) => {
        if (data) {
            return data;
        } else {
            throw new Error("email not found");
        }
    }).catch((error) => {
        throw error;
    })

};
// create a user
const createUser = (userDetails) => {
    encryptedPassword =bcrypt.hashSync(userDetails.password, 10);
    const user = new User({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        password: encryptedPassword,
        email: userDetails.email
    })
    return user.save()
}
// find all notes
const findAllUsers = () => {
    return User.find()
}
// query to find a single note
const findUser = (findId) => {
    return User.findById(findId)
}
// Find note and update it with the request body
const updateUser = (findId, userDetails) => {
    encryptedPassword =bcrypt.hashSync(userDetails.password, 10);
    return User.findByIdAndUpdate(findId, {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        password: encryptedPassword,
        email: userDetails.email
    })
};
// query to delete a note
const deleteById = (findId) => {
    return User.findByIdAndRemove(findId)
}
module.exports = {
    loginUser,
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById
}
