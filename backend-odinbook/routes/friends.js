var express = require('express');
var router = express.Router();

var friends_controller = require('../controllers/friendsController');

//GET Get all friend requests
router.get('/pending', friends_controller.get_pending_friends)

//POST create friend request
router.post('/pending', friends_controller.post_pending_friends);


//GET get all accepeed friends
router.get('/accepted', friends_controller.get_accepted_friends);
//POST add to friends array (and remove from pending friend request)

router.post('/accepted', friends_controller.post_accepted_friends);
module.exports = router;