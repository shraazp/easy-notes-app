const express = require('express')
var cors = require('cors')
const routerUser = express.Router()
const users = require('../controllers/user/user.controller.js');
const {userValidationRules, validate} = require('../middleware/user.middleware')
// login user
routerUser.post('/login', users.loginUser);
// Create a new user
routerUser.post('/',userValidationRules(), validate, users.create);
// Retrieve all users
routerUser.get('/', users.findAll);
// Retrieve a single user with userId
routerUser.get('/:userId', users.findOne);
// Update a user with userId
routerUser.put('/:userId', userValidationRules(), validate, users.update);
// Delete a user with usereId
routerUser.delete('/:userId', users.delete);
// forgot password
routerUser.post("/forgot", users.forgotPassword);
// email password reset route
routerUser.post("/reset/:token", users.resetPassword);
// Logout
routerUser.post('/logout', function(req, res, next) {
    // remove the req.user property and clear the login session
    req.logout()
  
    // destroy session data
    req.session = null;
  
    // redirect to homepage
 
  });
module.exports = routerUser
