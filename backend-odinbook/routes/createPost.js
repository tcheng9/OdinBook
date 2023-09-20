var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');

/////////////
/*

THIS PAGE CONTAINS ALL POST & LIKES FUNCTIONALITY
*/

////////////////

/* GET Create a post */
router.get('/', post_controller.get_post);

/* POST Create a post */

router.post('/create', post_controller.make_post)

/* GET info of a specific post */

router.get('/:id', post_controller.get_details);



/* UPDATE A POST */
router.patch('/:id', post_controller.get_post_by_id, post_controller.update_post);

/* DELETE A POST */
router.delete('/:id', post_controller.get_post_by_id, post_controller.delete_post);


///////////////////LIKES FUNCTIONALITY -> SO MAD I NESTED IT HERE


/* GET likes for a  specfici post; */
router.get('/:postId/likes', post_controller.get_likes);

/* POST likes for a specific post */ 
router.post('/:postId/likes', post_controller.post_likes);

/* GET OR POST? likes for a specific post */
router.get('/:postId/likes_middleware', post_controller.get_likes_by_id);

/* UNLIKE */
//GET route was used for initial testing BUT I think I need to use POST for sending data
router.get('/:postId/unlike', post_controller.get_likes_by_id, post_controller.post_unlikes);

router.post('/:postId/unlike', post_controller.get_likes_by_id, post_controller.post_unlikes);



module.exports = router;

