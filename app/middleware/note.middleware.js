const validate = (req, res, next) => { // check if content is present
    if (!req.body.content) {
        return res.status(400).send({message: "Note content can not be empty (handled by middleware)"});
    }
    // validate title name
    var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z0-9]+)*$)");
    if (! pattern.test(req.body.title)) {
        return res.status(400).send({message: "Note a valid title name"})
    } else {
        next()
    }
}
const jwtHelper = require('../../utils/jwt');
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwtHelper.verifyToken(token,(err, user) => {
            if (err) {
                return res.send(err);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
module.exports={validate,authenticateJWT}