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


/* POST user login */
router.post('/login', auth_controller.login_post);


/*GET route to check jwt token */
router.get('/verify_jwt', auth_controller.verify_jwt);


module.exports = router;
