const User = require('../models/user');
const {body, validationResult}  = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var async = require('async');
var bcrypt = require('bcrypt');

exports.login_get = (req, res, next) => {
    res.send('placeholder')
}

exports.signup_post = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        pendingFriendRequests: 'none for now',
        friends: 'none for now',
        facebookId: 'none for now'
    })

    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch(err){
        res.status(401).json({message: err.message});
    }

};
