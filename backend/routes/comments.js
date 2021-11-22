/* ROUTES VERS LE CONTROLLER "comments.js" */

const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/Comments');
const auth = require('../middleware/auth');


// Create
router.post('/create', auth, commentsCtrl.new);

// Read
router.post('/get', auth, commentsCtrl.get);

// Delete
router.post('/delete', auth, commentsCtrl.deleteOne);

module.exports = router;