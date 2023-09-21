var User = require('../models/user');
//Need to split between pending friend requests AND actualy 
//accepted friends
//2 ids to manage: Current logged in user's ID + potential friend's ID

exports.get_pending_friends_by_id = async(req, res, next) => {
//Function to get all pending friend requests for a specific user id
    let userId = req.params.userId

    User.findById(userId, function(err, user){
        if (err){
            res.json({message: err});
        } else {
            res.status(200).json({'pendingFriendRequests':user.pendingFriendRequests});
        }
    })
}

exports.sending_friend_request = async(req, res, next) => {
//Function to send a friend request to another user
    //sept2023-1 = 650c78b847d9e8e3b9cbfa4d
    // sept2023-2 = 650c78bc47d9e8e3b9cbfa4f
    // sept2023-3 = 650c78c047d9e8e3b9cbfa51
    // sept2023-4 = 650c78d247d9e8e3b9cbfa53

    let currUser = req.params.userId  //Current user who is logged in and sending the request
    let targetId = req.params.targetId //The person the current user wants to send to, "target"

    User.findByIdAndUpdate(currUser,
        {$addToSet: {pendingFriendRequests: targetId}},
        function(err, success){
            if (err){
                console.log(err);
            } else {
                console.log(success);
            }
    })

    User.findByIdAndUpdate(targetId,
        {$addToSet: {pendingFriendRequests: currUser}},
        function(err, success){
            if (err){
                console.log(err);
            } else {
                console.log(success);
            }
    })

}


exports.get_friends_list_by_id  = async (req, res, next) => {
//Function will get all accepted friends based on userId
    let userId = req.params.userId
    
    User.findById(userId, function(err, user){
        if (err){
            res.json({message: err});
        } else {
            // res.json({friends:user.friends});
            res.status(200).json({'accepted friends':user.friends});
        }
    })
}

exports.accepting_friend_request  = async (req, res, next) => {
//Function will handle accepted friend requests and adding them to the 
//friends lists for both users
    //sept2023-1 = 650c78b847d9e8e3b9cbfa4d
    // sept2023-2 = 650c78bc47d9e8e3b9cbfa4f
    // sept2023-3 = 650c78c047d9e8e3b9cbfa51
    // sept2023-4 = 650c78d247d9e8e3b9cbfa53

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

