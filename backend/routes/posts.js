/* ROUTES VERS LE CONTROLLER "user.js" */

const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/new', auth, multer, postsCtrl.new);
router.get('/get',auth, postsCtrl.get);
router.post('/getByUid',auth, postsCtrl.getByUid);

module.exports = router;