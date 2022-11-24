const Profile = require('../models/profile');
const mongoose = require('mongoose');
const {body, validationResult} = require('express-validator');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },

    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({storage: storage}); //dest is where it is store. NEEDS SETUP IN APP.JS


/*GET a profile */
exports.get_profile = async(req, res, next) => {
    Profile.find({}, function (err, result){
        try{
            res.status(200).json(result);
        } catch (err){
            res.status(401).json({message: err.message})
        }
    });
}


/*POST a profile */

exports.make_profile = async(req, res, next) => {

    console.log(req.file);

    // res.json({message: "you are reaching the server"});
    const profile = new Profile({
        userId: req.params.userId,
        age: req.body.age,
        gender:req.body.gender,
        worstTravelExp: req.body.travel,
        designTVShow:req.body.show,
        superpower:req.body.power,
        profileImage:req.file.path
    });



    try {
        const newProfile = await profile.save();
        console.log('success');
        res.status(201).json(newProfile);

    } catch (err){
        console.log('failure');
        res.status(401).json({message:err.message});
    }
}

/*GET profile by ID*/

exports.get_profile_by_id = async(req, res, next) => {
    let userId = req.params.userId;
    
    // res.send(userId);

    //ITS NOT FINDBYID, U NEED TO DO FIND THEN MATCH BY USERID PARAMETER
    // Profile.findById(userId, function(err, data) {
    //     if(err){
    //         res.status(400).json({message: err});

    //     } else {
    //         res.status(201).json(data);
    //     }
    // });

    Profile.find({userId: userId}, function (err, result){
        try {
            res.status(200).json(result)

        } catch (err){
            res.status(401).json({message: err.message});
        }
    })
};