const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwtHelper = require("../../utils/jwt");
/**
 * Schema of the user
 */
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
    },
    resetPasswordToken: String
}, {timestamps: true});
const User = mongoose.model('User', UserSchema);
/**
 * Function for login of the user 
 * @param {Object} userDetails
 * @returns promise
 */
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
/**
 * function to create a user
 * @param {Object} userDetails 
 * @returns promise with user details
 */
const createUser = (userDetails) => {
    encryptedPassword = bcrypt.hashSync(userDetails.password, 10);
    const user = new User({firstName: userDetails.firstName, lastName: userDetails.lastName, password: encryptedPassword, email: userDetails.email})
    return user.save()
}
/**
 * function to get all the users
 * @returns promise with all the users
 */
const findAllUsers = () => {
    return User.find()
}
/**
 * function to find a particular user with userid
 * @param {Object} findId 
 * @returns promise with the particular user if not error message
 */
const findUser = (findId) => {
    return User.findById(findId)
}
/**
 * function to update user
 * @param {Object} findId 
 * @param {Object} userDetails 
 * @returns promise with previous version of user
 */
const updateUser = (findId, userDetails) => {
    encryptedPassword = bcrypt.hashSync(userDetails.password, 10);
    return User.findByIdAndUpdate(findId, {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        password: encryptedPassword,
        email: userDetails.email
    })
};
/**
 * function to delete a user by his id
 * @param {Object} findId user id
 * @returns status message
 */
const deleteById = (findId) => {
    return User.findByIdAndRemove(findId)
}
/**
 * function to send a mail if password is forgotten
 */
forgotPassword = (email) => {
    return User.findOne({email: email}).then((data) => {
        if (!data) {
            throw "Email not found";
        } else {
            let token = jwtHelper.generateAccessToken();
            data.resetPasswordToken = token;
            return data.save().then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
        }
    }).catch((err) => {
        throw err;
    });
};
resetPassword = (token, newPassword) => {
    return User.findOne({resetPasswordToken: token}).then((data) => {
        if (!data) {
            throw "token not found";
        } else {
            encryptedPassword = bcrypt.hashSync(newPassword, 10);
            (data.password = encryptedPassword),
            (data.resetPasswordToken = undefined);
            return data.save().then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
        }
    }).catch((err) => {
        throw err;
    });
};

module.exports = {
    loginUser,
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById,
    forgotPassword,
    resetPassword,
    User
}
