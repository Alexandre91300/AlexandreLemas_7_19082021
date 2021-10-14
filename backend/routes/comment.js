/* ROUTES VERS LE CONTROLLER "user.js" */

const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

// Create
router.post('/new', auth, commentsCtrl.new);

// Read
router.post('/get', auth, commentsCtrl.get);

// Delete
router.post('/deleteOne', auth, commentsCtrl.deleteOne);

module.exports = router;