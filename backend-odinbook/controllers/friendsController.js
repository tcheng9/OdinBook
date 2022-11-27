var User = require('../models/user');
//Need to split between pending friend requests AND actualy 
//accepted friends
//2 ids to manage: Current logged in user's ID + potential friend's ID

exports.get_pending_friends = async(req, res, next) => {
    // Get all friends from a single user ID
    res.send('placeholder GET');
}

exports.post_pending_friends = async(req, res, next) => {
    // test5 - 6382c728cd649eee24484323
    // test6 - 6382c72dcd649eee24484325
    let currUser = '6382c728cd649eee24484323'
    let friendId = "6382c72dcd649eee24484325"

    User.findByIdAndUpdate(currUser,
        {$push: {friends: friendId}},
        function(err, success){
            if (err){
                console.log(err);
            } else {
                console.log(success);
            }
    })

}


exports.get_accepted_friends  = async (req, res, next) => {
 //Function will get all accepted friends   
}

exports.post_accepted_friends  = async (req, res, next) => {
//Function will handle accepted friend requests and adding them to the 
//friends lists for both users

}

