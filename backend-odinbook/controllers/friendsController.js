var User = require('../models/user');
//Need to split between pending friend requests AND actualy 
//accepted friends
//2 ids to manage: Current logged in user's ID + potential friend's ID

exports.get_pending_friends = async(req, res, next) => {
//Function to get all pending friend requests for a user
    let userId = '638386a5de2e8f31c224b0fc'

    User.findById(userId, function(err, user){
        if (err){
            res.json({message: err});
        } else {
            res.json({'pending friend requests':user.pendingFriendRequests});
        }
    })
}

exports.post_pending_friends = async(req, res, next) => {
//Function to send a friend request to another user
    // usera - 638386a5de2e8f31c224b0fc
    // userb - 638386aade2e8f31c224b0fe
    let currUser = '638386a5de2e8f31c224b0fc'
    let friendId = "638386aade2e8f31c224b0fe"

    User.findByIdAndUpdate(currUser,
        {$addToSet: {pendingFriendRequests: friendId}},
        function(err, success){
            if (err){
                console.log(err);
            } else {
                console.log(success);
            }
    })

    User.findByIdAndUpdate(friendId,
        {$addToSet: {pendingFriendRequests: currUser}},
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
    let userId = '638386a5de2e8f31c224b0fc'

    User.findById(userId, function(err, user){
        if (err){
            res.json({message: err});
        } else {
            res.json({friends:user.friends});
        }
    })
}

exports.post_accepted_friends  = async (req, res, next) => {
//Function will handle accepted friend requests and adding them to the 
//friends lists for both users

    let currUser = '638386a5de2e8f31c224b0fc'
    let friendId = "638386aade2e8f31c224b0fe"
   
   

    //Adding to friends list
    User.findByIdAndUpdate(currUser,
        {$addToSet: {friends: friendId}},
        function(err, success){
            if (err){
                console.log('1' + err);
            } else {
                console.log(success);
            }
    })

    User.findByIdAndUpdate(friendId,
        {$addToSet: {friends: currUser}},
        function(err, success){
            if (err){
                console.log('2' + err);
            } else {
                console.log(success);
            }
    })

    //Remove from pending friends list
    
    
     User.findByIdAndUpdate(currUser,
        {$pull: {pendingFriendRequests: friendId}},
        function(err, success){
            if (err){
                console.log('3' + err);
            } else {
                console.log(success);
            }
    })

    User.findByIdAndUpdate(friendId,
        {$pull: {pendingFriendRequests: currUser}},
        function(err, success){
            if (err){
                console.log('4'+ err);
                
            } else {
                res.json({message: 'final one is successful'})
            }
    })

}

