const session = require("express-session");
const crypto = require('crypto');
const sessionSecret = crypto.randomBytes(64).toString('hex');

const sessionConfig = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
};

module.exports = sessionConfig;