const {
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById
} = require('../models/user.model');
const createNewUser = (userDetails) => {
    return createUser(userDetails)
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
    createNewUser,
    getUsers,
    getUser,
    updateUsers,
    deleteUsers
}
