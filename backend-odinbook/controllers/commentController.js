
const {body, validationResult}  = require('express-validator');
var async = require('async');
var Comment = require('../models/comment');


exports.get_comments = async (req, res, next) => {
    res.send('get comments API call');
} 

exports.post_comments = async(req, res,next) => {
    const comment = new Comment({
        text: req.body.text,
        authorId: req.body.userId,
        postId: req.body.postId,
    })

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err){
        res.status(401).json({message:err.message});
    }
}

