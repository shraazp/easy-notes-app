const logger=require('../../utils/logger.js')
const{createNewUser,
    getUsers,
    getUser,
    updateUsers,
    deleteUsers
}=require('../service/user.service')
exports.create=(req,res)=>{
    createNewUser(req.body).then((data)=>res.send(data)).catch((err)=>{
        logger.error(err.message || "Some error occurred while creating the user.")
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
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
            message: err.message || "Some error occurred while retrieving users."
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
exports.update = (req, res) => { // Find note and update it with the request body
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
    deleteUsers(req.params.userId).then(result=> {
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