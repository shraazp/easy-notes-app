const {
    loginUser,
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById
} = require('../models/user.model');
const mail=require("../../utils/mailer")
const jwtHelper = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const createNewUser = (userDetails) => {
    mail.sendmail();
    return createUser(userDetails)
}
const login = (userDetails) => {
    return loginUser(userDetails).then((data) => {
        if(bcrypt.compareSync(userDetails.password,data.password)){
          var token=jwtHelper.generateAccessToken(userDetails.email);
          return token
        }
        else
        {
          throw new Error("Password is incorrect")
        }
    }).catch((error) => {
        throw error
    })
}
const getUsers = () => {
    return findAllUsers()
}

const getUser = (findId, callback) => {
    findUser(findId, (error, data) => {
        return(error) ? callback(error) : callback(data);
    })
}

const updateUsers = (findId, userDetails) => {
    return updateUser(findId, userDetails)
}

const deleteUsers = (findId) => {
    return deleteById(findId)
}

module.exports = {
    login,
    createNewUser,
    getUsers,
    getUser,
    updateUsers,
    deleteUsers
}
