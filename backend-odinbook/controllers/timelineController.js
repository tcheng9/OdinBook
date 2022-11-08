const User = require('../models/user');
const {body, validationResult}  = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var async = require('async');

// exports.login_get = (req, res, next) => {
//     res.send('placeholder')
// }

