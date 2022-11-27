const User = require('../models/user');
const {body, validationResult}  = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var async = require('async');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.login_get = (req, res, next) => {
    res.send('placeholder')
}

exports.signup_post = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        pendingFriendRequests: [],
        friends: [],
        facebookId: 'none for now'
    })

    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch(err){
        res.status(401).json({message: err.message});
    }

};


exports.login_post = async(req, res, next) => {
    const users = await User.find({username: req.body.username });
    if (users == null){
        return res.status(400).send('cannot find user');
    }
    
    try {
        if(await bcrypt.compare(req.body.password, users[0].password)){
            const currUser = {
                username: users[0].username,
                id: users[0]._id,
            }
            
            const accessToken = jwt.sign(currUser, process.env.ACCESS_TOKEN_SECRET);
            
            res.json({accessToken: accessToken});
        } else {
            res.json('not successful');
        }
     } catch (err) {
        res.status(500).json({message: err.message});
    }
    
}


exports.verify_jwt = async (req, res, next) => {


    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
    
}

//verifying auth token as a function
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
    
}
