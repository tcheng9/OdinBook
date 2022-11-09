var express = require('express');
var router = express.Router();
var async = require('async');
var bcrypt = require('bcrypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');

//
var auth_controller = require('../controllers/authController');

/* GET   */
router.get('/', function(req, res, next) {
  res.send('placeholder');
}
);
/* POST User sign up */
router.post('/signup', auth_controller.signup_post)
// router.post('/createpost', post_controller.create_post)

module.exports = router;
