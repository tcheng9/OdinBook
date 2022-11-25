var express = require('express');
var router = express.Router();

var friends_controller = require('../controllers/friendsController');

//GET Get all friends 
router.get('/', friends_controller.get_friends)

//POST create friends -> friends request??
router.post('/', friends_controller.post_friends);

module.exports = router;