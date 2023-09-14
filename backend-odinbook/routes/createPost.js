var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');

/////////////
/*

THIS PAGE CONTAINS ALL POST FUNCTIONALITY
*/

////////////////

/* GET Create a post */
router.get('/', post_controller.get_post);

/* POST Create a post */

router.post('/create', post_controller.make_post)

/* GET info of a specific post */

router.get('/:id', post_controller.get_details);

/* GET likes for a  specfici post; */
router.get('/:postId/likes', post_controller.get_likes);

/* POST likes for a specific post */ 
router.post('/:postId/likes', post_controller.post_likes);

/* UPDATE A POST */
router.put('/:id', post_controller.update_post);

/* DELETE A POST */
router.delete('/:id', post_controller.delete_post);

module.exports = router;
