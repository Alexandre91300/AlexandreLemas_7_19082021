/* ROUTES VERS LE CONTROLLER "user.js" */

const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

// Create
router.post('/new', auth, commentsCtrl.new);

module.exports = router;