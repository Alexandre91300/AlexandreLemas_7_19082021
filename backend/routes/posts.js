/* ROUTES VERS LE CONTROLLER "posts.js" */

const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Create
router.post('/create', auth, multer, postsCtrl.new);
router.post('/like', auth, postsCtrl.like);

// Read
router.get('/get', auth, postsCtrl.get);
router.post('/getByUid', auth, postsCtrl.getByUid);

// Update 
router.patch('/update', auth, postsCtrl.update);

// Delete
router.post('/delete', auth, postsCtrl.delete);

module.exports = router;