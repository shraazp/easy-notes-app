const { resolveContent } = require('nodemailer/lib/shared');
const logger = require('../../../utils/logger.js')
const {
    login,
    createNewUser,
    getUsers,
    getUser,
    updateUsers,
    deleteUsers,
    forgot,
    reset
} = require('../../service/user.service')
const dtoObject = require("./user.responseSchema");
let responseObject;
//login user
exports.loginUser = (req, res) => {
    let userDetails = req.body
    login(userDetails).then((data) => {
        responseObject = dtoObject.userApiSuccess;
        responseObject.message = data;
        res.send(responseObject);
    }).catch((err) => {
        logger.error(err);
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
    })
}
//create a user
exports.create = (req, res) => {
    createNewUser(req.body).then((data) => {res.send(data);}).catch((err) => {
        logger.error(err);
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
    })
}
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    getUsers().then(users => {
        res.send(users);
    }).catch(err => {
        logger.error(err);
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject)
});}
// Find a single note with a noteId
exports.findOne = (req, res) => {
    getUser(req.params.userId).then((data)=>{
        responseObject = dtoObject.userApiSuccess;
        responseObject.message = data;
        res.send(responseObject);
    })
    .catch(err => {
        if (err.kind === 'ObjectId') {
            logger.error("user not found with id")
            responseObject = dtoObject.userApiFindFailure;
            res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);
    });
};
// Find note and update it with the request body
exports.update = (req, res) => { 
    let id = req.params.userId
    let userDetails = req.body
    updateUsers(id, userDetails).then(result => {
        res.send(result);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            logger.error("user not found with id")
            responseObject = dtoObject.userApiFindFailure;
            res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    deleteUsers(req.params.userId).then(result => {
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            logger.error("user not found with id " + req.params.noteId)
            responseObject = dtoObject.userApiFindFailure;
            res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);

        });
    
};

exports.forgotPassword = (req, res) => {
    let email = req.body.email;
    forgot(email)
      .then((data) => {
        res.send("Result:" + data);
      })
      .catch((err) => {
        console.log("error:" + err);
        res.send(err);
      });
  };

  exports.resetPassword = (req, res) => {
    let token = req.params.token;
    let password = req.body.password
    
    reset(token,password)
      .then((data) => {
        res.json({message:"Password updated successfully","Result:" :data});
      })
      .catch((err) => {
        console.log("error:" + err);
        res.send(err);
      });
  };