const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticate = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization');

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, config.secretKey);

        // Add the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const googleAuthenticate = (req, res, next) => {


    console.log(req.isAuthenticated())

    if (req.isAuthenticated()) {

        next();
    }
    else {

        return res.send(false)
    }



};

module.exports = {
    authenticate,
    googleAuthenticate

};
