const Profile = require('../models/profile');
const mongoose = require('mongoose');
const {body, validationResult} = require('express-validator');



/*GET a profile */
exports.get_profile = async(req, res, next) => {
    res.send('placeholder');
}


/*POST a profile */

exports.make_profile = async(req, res, next) => {
    const profile = new Profile({
        userId: req.body.userId,
        age: req.body.age,
        gender:req.body.gender,
        worstTravelExp: req.body.travel,
        designTVShow:req.body.show,
        superpower:req.body.power,
        profileImage:req.body.image
    });

    try {
        const newProfile = await profile.save();
        res.status(201).json(newProfile);

    } catch (err){
        res.status(401).json({message:err.message});
    }
}

/*GET profile by ID*/

exports.get_profile_by_id = async(req, res, next) => {
    let userId = req.params.userId;

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