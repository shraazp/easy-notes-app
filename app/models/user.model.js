const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwtHelper = require("../../utils/jwt");
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
    resetPasswordToken: String,
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
forgotPassword = (email) => {
    return User
      .findOne({ email: email })
      .then((data) => {
        if (!data) {
          throw "Email not found";
        } else {
          let token = jwtHelper.generateAccessToken();
          data.resetPasswordToken = token;
          return data
            .save()
            .then((data) => {
              return data;
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  resetPassword = (token, newPassword) => {
    return User
      .findOne({ resetPasswordToken: token })
      .then((data) => {
        if (!data) {
          throw "token not found";
        } else {
          encryptedPassword = bcrypt.hashSync(newPassword, 10);
          (data.password = encryptedPassword),
            (data.resetPasswordToken = undefined);
          return data
            .save()
            .then((data) => {
              return data;
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
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
