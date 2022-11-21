var express = require('express');
var router = express.Router();
var profile_controller = require('../controllers/profileController');

/* GET Create a post */
router.get('/', function(req, res, next) {
  res.send('get request for profile page');
}
);
/* POST Create a post */
router.post('/', profile_controller.make_profile);


/*Get profile by user ID */
router.post('/:id', profile_controller.make_profile);


module.exports = router;
