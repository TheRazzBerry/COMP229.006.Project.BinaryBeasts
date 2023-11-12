// Define Module Dependencies
let jwt = require('jsonwebtoken');
let { expressjwt } = require('express-jwt');

// Define Environment Variables
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

// Define Model Dependencies
let User = require('../models/userModel');
let Tournament = require('../models/tournamentModel');

module.exports.signin = async function (req, res, next) {
    try {
        let user = await User.findOne({ "email": req.body.email });
        if (!user) { return res.status(404).json({ message: "User was not found!" }); }
        if (!user.authenticate(req.body.password)) { return res.status(400).json({ mesage: "Incorrect Password!" }); }
        // Define JWT Payload
        let payload = {
            id: user._id,
            username: user.userName,
            email: user.email
        }
        // Sign JWT
        let signedToken = jwt.sign(payload, secretKey, { algorithm: "HS512" });
        return res.status(200).json({ message: "Recieved a Web Token!", token: signedToken });
    } catch (error) { next(error); }
}

module.exports.requireSignin = expressjwt({
    secret: secretKey,
    algorithms: ['HS512'],
    userProperty: 'auth'
});

module.exports.hasAuth = async function (req, res, next) {
    let auth = req.auth && req.user && req.userName == req.auth.userName;
    if (!auth) { return res.status(403).json({ message: "User is not authorized!" }); }
    next();
}

exports.isAllowed = async function (req, res, next) {
    try {
        next();
    } catch (error) { next(error); }
}