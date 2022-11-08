var express = require('express');
var router = express.Router();

/* GET Create a post */
router.get('/', function(req, res, next) {
  res.send('placeholder');
}
);
/* POST Create a post */

// router.post('/createpost', post_controller.create_post)

module.exports = router;
