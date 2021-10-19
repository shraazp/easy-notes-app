const {
    loginUser,
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById
} = require('../models/user.model');
const jwtHelper = require('../../utils/jwt');

const createNewUser = (userDetails) => {
    return createUser(userDetails)
}
const login = (userDetails, callback) => {
    return loginUser(userDetails).then((data) => {
        if(userDetails.password==data.password){
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
