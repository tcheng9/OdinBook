
const {body, validationResult}  = require('express-validator');
var async = require('async');
var Comment = require('../models/comment');


exports.get_comments = async (req, res, next) => {
    // const idReturn = Comment.findOne({postId: req.body.username}, '').exec()
    Comment.findOne({postId: req.body.postId}, function(err, result){
        try{
            res.status(200).json(result)
        } catch (err) {
            res.status(401).json({message: err.message});
        }
     })

    
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

