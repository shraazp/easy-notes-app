const jwtHelper = require('../../utils/jwt');
let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
  
     uuid = require('uuid');

    router = express.Router();
/**
 * to validate if content in note is present or not as well as if title is a string
 * @param {object} req 
 * @param {object} res 
 * @param {next} next 
 * @returns status message
 */
const validate = (req, res, next) => {
    if (!req.body.content) {
        return res.status(400).send({message: "Note content can not be empty (handled by middleware)"});
    }
    var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z0-9]+)*$)");
    if (! pattern.test(req.body.title)) {
        return res.status(400).send({message: "Note a valid title name"})
    } else {
        next()
    }
}
/**
 * to ensure if the token is decoded properly or not
 * @param {object} req 
 * @param {object} res 
 * @param {next} next 
 */
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwtHelper.verifyToken(token, (err, user) => {
            if (err) {
                return res.send(err);
            }
            req.body.userId = user._id;
          
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
const DIR = 'C:/Users/shravya.p_ymedialabs/node/node-easy-notes-app/app/public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,uuid.v4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = {
    validate,
    authenticateJWT,
   upload
}
