/* ROUTES VERS LE CONTROLLER "user.js" */

const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Create
router.post('/new', auth, multer, postsCtrl.new);

// Read
router.get('/get',auth, postsCtrl.get);
router.post('/getByUid',auth, postsCtrl.getByUid);

// Update 
router.post('/update',auth, postsCtrl.update);

// Delete
router.post('/delete',auth, postsCtrl.delete);

module.exports = router;