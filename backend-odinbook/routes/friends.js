var express = require('express');
var router = express.Router();

var friends_controller = require('../controllers/friendsController');

//GET Get all friend requests
router.get('/pending/:userId', friends_controller.get_pending_friends_by_id)

//POST - function to submit a friend request
router.post('/pending/:userId/:targetId', friends_controller.sending_friend_request);


//GET get all accepeed friends
router.get('/accepted/:userId', friends_controller.get_friends_list_by_id);
//POST add to friends array (and remove from pending friend request)

//POST - Function to accepting a pending friend request 
router.post('/accepted/:userId/:targetId', friends_controller.accepting_friend_request);

//POST - function to delete a current friend 
router.post('/delete/:userId/:targetId', friends_controller.delete_accepted_friend)

module.exports = router;