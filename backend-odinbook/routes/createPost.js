var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');

/* GET Create a post */
router.get('/', post_controller.get_post);

/* POST Create a post */

router.post('/create', post_controller.make_post)

module.exports = router;
