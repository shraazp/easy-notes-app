const {
    loginUser,
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById,
    forgotPassword,
    resetPassword
    
} = require('../models/user.model');
const mailHelper=require("../../utils/mailer")
const jwtHelper = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const createNewUser = (userDetails) => {
    return createUser(userDetails)
}
const login = (userDetails) => {
    return loginUser(userDetails).then((data) => {
        if(bcrypt.compareSync(userDetails.password,data.password)){
          var token=jwtHelper.generateAccessToken(data._id);
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

const getUser = (findId) => {
  return  findUser(findId)
}

const updateUsers = (findId, userDetails) => {
    return updateUser(findId, userDetails)
}

const deleteUsers = (findId) => {
    return deleteById(findId)
}

forgot = (email) => {
    return forgotPassword(email)
      .then((data) => {
        return mailHelper
          .mailer(data.email, data.resetPasswordToken)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };
  
  reset = (token,password) =>{
    return resetPassword(token,password)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw err;
    })
  }


module.exports = {
    login,
    createNewUser,
    getUsers,
    getUser,
    updateUsers,
    deleteUsers,
    forgot,
    reset
}
