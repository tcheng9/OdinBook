var express = require('express');
var router = express.Router();
var profile_controller = require('../controllers/profileController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, './uploads/');
  },

  filename: function(req, file, cb){
      cb(null, new Date().toISOString() + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024*1024*5
  },
  fileFilter:fileFilter
}) //dest is where it is store. NEEDS SETUP IN APP.JS



/* GET Create a post */
router.get('/', profile_controller.get_profile);
/* POST Create a post */
router.post('/', profile_controller.make_profile);


/*POSt - create profile by user ID */
router.post('/create', upload.single('profileImage'), profile_controller.make_profile);


/* GET - get profile by user ID */
router.get('/create/:userId', profile_controller.get_profile_by_id)

/*POSt - create profile by user ID */
router.post('/create/:userId', upload.single('profileImage'), profile_controller.make_profile);


module.exports = router;
