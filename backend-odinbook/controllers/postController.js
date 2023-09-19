const User = require('../models/user');
const {body, validationResult}  = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var async = require('async');
var Post = require('../models/post');
const mongoose = require('mongoose');

// exports.login_get = (req, res, next) => {
//     res.send('placeholder')
// }

exports.get_post = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({'timestamp':-1});
        res.json(posts);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}


exports.make_post = async (req, res, next) => {

    const bsonAuthorId = mongoose.Types.ObjectId(req.body.authorId.trim());

    const post = new Post({
        title: req.body.title,
        authorId: req.body.authorId,
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


//update a specific post
exports.update_post = async(req, res, next) => {
    try {
        res.status(200).json({message: 'working on post update'});
    } catch(err) {
        res.send(401).json({message: err.message})
    }
}

//delete a specific post
exports.delete_post = async (req, res, next) => {
    try {

        // res.send(req.params.id);
        // await res.posts.delete({"_id":req.params.id});
        // res.status(200).json({message: 'working on post delete'});
        let post;
        post = await Post.findById(req.params.id);
        res.send(post);
        
    } catch(err) {
        res.json({message: err.message})
    }
}

/////////////LIKES FUNCTIONALITY ----> START //////////////
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

    if (userId == null){
        res.json({message: "null value"});
    }

    // res.send(userId);
    Post.findByIdAndUpdate(postId, {$addToSet: {likes: [userId]}}, function(err, data) {
        if (err){
            throw err;
        } else {
            res.status(201).json({response: req.params.userId});
        }
            
        
    })
    
    
}


/////////////LIKES FUNCTIONALITY ----> END //////////////