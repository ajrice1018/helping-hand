const jwt = require('jsonwebtoken');
const config = require('config');


// a middle ware function is a function that has access to the req and res. the
// next moves to the next action
module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res
            .status(401)
            .json({msg: 'No token. Authorization denied.'});
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res
            .status(401)
            .json({msg: 'Token is not valid'});
    }

};