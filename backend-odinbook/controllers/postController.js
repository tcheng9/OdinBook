const User = require('../models/user');
const {body, validationResult}  = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var async = require('async');
var Post = require('../models/post');

// exports.login_get = (req, res, next) => {
//     res.send('placeholder')
// }


exports.make_post = async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        authorId: "placeholder",
        commentId: "placeholder",
        message: req.body.message,
        likes: []
    
    })

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(401).json({message: err.message});
    }
}

exports.get_post = async (req, res, next) => {
    res.send('get post');
}