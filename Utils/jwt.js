const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.generateAccessToken = (_id) => {
    return jwt.sign({
        _id: _id
    }, process.env.TOKEN_KEY, {expiresIn: '1h'});
}
exports.verifyToken = (token, callback) => {
    return jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
    });
};
