const mongoose = require('mongoose');
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
    loginUser,
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById
}
