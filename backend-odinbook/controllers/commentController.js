
const {body, validationResult}  = require('express-validator');
var async = require('async');
var Comment = require('../models/comment');

//Funtionality to get all comments stored in DB
exports.get_comments = async (req, res, next) => {
    
    
    let postId = req.query.postId 
    
    Comment.find({postId: postId}, function(err, result){
        try{
            res.status(200).json(result)
        } catch (err) {
            res.status(401).json({message: err.message});
        }
     })

    
} 

//functionality to upload a new comment with incoming request data
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


//functionalty to update an existing comment by its id
exports.update_comment = async(req, res, next) => {
    try {
        console.log('here update')
        res.status(200).json({message:'working update'});
    } catch (err){
        res.status(401).json({message:err.message});
    }
}

//functionality to delete an existing comment by its id
exports.delete_comment = async(req,res,next) => {
    try{
        await res.comment.remove();
        res.json({message:'deleted comment'})
    } catch (err) {
        res.status(401).json({message:err.message});
    }
}

exports.get_comment_by_id = async(req, res, next) => {
    let comment;
    try{
        
        comment = await Comment.findById(req.params.id);
        if (comment === null){
            return res.status(404).json({message:`cannot find post ${req.params.id}`});
        }   
    } catch (err){
        res.status(401).json({message: err.message});
    }
    res.comment = comment;
    next();
}