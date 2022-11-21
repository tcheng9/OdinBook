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


/* GET - get profile by user ID */
router.get('/:userId', profile_controller.get_profile_by_id)

/*POSt - create profile by user ID */
router.post('/:userId', profile_controller.make_profile);


module.exports = router;
