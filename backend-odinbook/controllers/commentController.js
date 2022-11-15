
const {body, validationResult}  = require('express-validator');
var async = require('async');
var Comment = require('../models/comment');


exports.get_comments = async (req, res, next) => {
    res.send('get comments API call');
} 

exports.post_comments = async(req, res,next) => {
    const comment = new Comment({
        text: "test",
        authorId: "placeholder",
        postId: "placeholder",
    })

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err){
        res.status(401).json({message:err.message});
    }
}

