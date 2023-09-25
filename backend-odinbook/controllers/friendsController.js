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
     //sept2023-10 = 650de2f2ebc0632606b092fa
    //sept2023-11 = 650de2f7ebc0632606b092fc

    User.findByIdAndUpdate(currUser,
            {$addToSet: {pendingFriendRequests: targetId}},
            function(err, success){
                if (err){
                    // res.status(401).json({err: err.message})
                    
                } else {
                    // res.status(200).json({message: 'friend request sent'})
                }
        })

    User.findByIdAndUpdate(targetId,
        {$addToSet: {pendingFriendRequests: currUser}},
        function(err, success){
            if (err){
                // res.status(401).json({err: err.message})
            } else {
                // res.status(200).json({message: 'friend request sent'})
            }
    })
    res.json({message: 'here'});
    

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

    //sept2023-10 = 650de2f2ebc0632606b092fa
    //sept2023-11 = 650de2f7ebc0632606b092fc
    let currUser = req.params.userId  //Current user who is logged in and sending the request
    let targetId = req.params.targetId //The person the current user wants to send to, "target"

    
   
   

    //Adding to friends list
    User.findByIdAndUpdate(currUser,
        {$addToSet: {friends: targetId}},
        function(err, success){
            if (err){
                // res.status(401).json({err: err.message})
                console.log(err);
            } else {
                // res.status(200).json({message: 'friend request sent'})
            }
    })
    User.findByIdAndUpdate(targetId,
        {$addToSet: {friends: currUser}},
        function(err, success){
            if (err){
                console.log(err)
                // res.status(401).json({err2:err.message});
            } else {
                console.log('working-2')
                // res.status(200).json({message2: 'friend request sent - 2'});
            }
    })

    //Remove from pending friends list
    
    
     User.findByIdAndUpdate(currUser,
        {$pull: {pendingFriendRequests: targetId}},
        function(err, success){
            if (err){
                console.log(err)
                // res.status(401).json({err3:err.message});
            } else {
                console.log('working3')
                // res.status(200).json({message3: 'friend removed from pending friends array - 3'});
            }
    })

    User.findByIdAndUpdate(targetId,
        {$pull: {pendingFriendRequests: currUser}},
        function(err, success){
            if (err){
                console.log(err)
                // res.status(401).json({err: err.message});
                
            } else {
                
                // res.status(200).json({message4: 'friend removed from pending friends array - 4'});
            }
    })
    res.json({message: 'here2'});

}


exports.delete_accepted_friend = async (req, res, next) => {
    //function to unfriend a current friend
    
    //sept2023-1 = 650c78b847d9e8e3b9cbfa4d
    // sept2023-2 = 650c78bc47d9e8e3b9cbfa4f
    // sept2023-3 = 650c78c047d9e8e3b9cbfa51
    // sept2023-4 = 650c78d247d9e8e3b9cbfa53

    // sept2023-10 = 650de2f2ebc0632606b092fa
    // sept2023-11 = 650de2f7ebc0632606b092fc
    let currUser = req.params.userId  //Current user who is logged in and sending the request
    let targetId = req.params.targetId //The person the current user wants to send to, "target"

    //Remove from pending friends list
    // res.send(currUser)
    
    User.findByIdAndUpdate(currUser,
        {$pull: {friends: targetId}},
        function(err, success){
            if (err){
                console.log(err)
                // res.status(401).json({err3:err.message});
            } else {
                console.log('working3')
                // res.status(200).json({message3: 'friend removed from pending friends array - 3'});
            }
    })

    User.findByIdAndUpdate(targetId,
        {$pull: {friends: currUser}},
        function(err, success){
            if (err){
                console.log(err)
                // res.status(401).json({err: err.message});
                
            } else {
                
                // res.status(200).json({message4: 'friend removed from pending friends array - 4'});
            }
    })
    res.json({message: 'delete friend complete'})
    // return;
}