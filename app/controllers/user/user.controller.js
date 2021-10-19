const logger = require('../../../utils/logger.js')
const {
    login,
    createNewUser,
    getUsers,
    getUser,
    updateUsers,
    deleteUsers
} = require('../../service/user.service')
//login user
exports.loginUser = (req, res) => {
    let userDetails = req.body
    login(userDetails).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err.message)
    })
}
//create a user
exports.create = (req, res) => {
    createNewUser(req.body).then((data) => res.send(data)).catch((err) => {
        logger.error(err.message)
        res.status(500).send({
            message: err.message
        });
    })
}
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    getUsers().then(users => {
        res.send(users);
    }).catch(err => {
        logger.error("error 500 while retrieving data")
        res.status(500).send({
            message: err.message
        });
    })
};
// Find a single note with a noteId
exports.findOne = (req, res) => {
    getUser(req.params.userId, (error, resultData) => {
        logger.error("Error retrieving user with id " + req.params.noteId)
        if (error) {
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.noteId
            })
        }

        if (err.kind === 'ObjectId') {
            logger.error("user not found with id")
            return res.status(404).send({
                message: "user not found with id " + req.params.noteId
            });
        }
        res.send(resultData);
    })
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
            return res.status(404).send({
                message: "user not found with id " + req.params.noteId
            });
        }
        logger.error("Error updating user with id " + req.params.noteId)
        return res.status(500).send({
            message: "Error updating user with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    deleteUsers(req.params.userId).then(result => {
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            logger.error("user not found with id " + req.params.noteId)
            return res.status(404).send({
                message: "user not found with id " + req.params.noteId
            });
        }
        logger.error("Could not delete note with id " + req.params.noteId)
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId

        });
    });
};
