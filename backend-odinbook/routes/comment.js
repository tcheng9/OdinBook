var express = require('express');
var router = express.Router();


var comment_controller = require('../controllers/commentController');


/*GET all comments */
router.get('/', comment_controller.get_comments);

/*POST a comment*/
router.post('/send', comment_controller.post_comments);


module.exports = router;