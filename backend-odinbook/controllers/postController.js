const User = require('../models/user');
const {body, validationResult}  = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var async = require('async');
var Post = require('../models/post');

// exports.login_get = (req, res, next) => {
//     res.send('placeholder')
// }

exports.get_post = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}


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

// details ofa specific post
exports.get_details = (req, res, next) => {
    res.send(req.params.id);
}

//GET like functon
exports.get_likes = (req, res,next) => {
    let postId = req.params.postId;

    Post.findById(postId, function(err, data) {
        if (err){
            res.status(401).json({message: err})
        } else {
            res.status(201).json(data);
        }
    })

}

//POST like function
exports.post_likes = (req, res, next) => {
    let userId = req.body.userId;
    // let userId = "test5asdad";
    let postId = req.params.postId;

    // res.send(userId);
    Post.findByIdAndUpdate(postId, {$addToSet: {likes: [userId]}}, function(err, data) {
        if (err){
            throw err;
        } else {
            res.status(201).json({response: req.params.userId});
        }
            
        
    })
    
    
}