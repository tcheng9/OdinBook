var express = require('express');
var router = express.Router();


var comment_controller = require('../controllers/commentController');


/*GET all comments */
router.get('/', comment_controller.get_comments);

/*POST a comment*/
router.post('/create', comment_controller.post_comments);

/* PUT (update) a comment */
router.put('/:id', comment_controller.update_comment);
/* delete a comment */
router.delete('/:id', comment_controller.delete_comment);

module.exports = router;