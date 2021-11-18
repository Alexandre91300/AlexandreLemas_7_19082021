/* ROUTES VERS LE CONTROLLER "user.js" */

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User');
const auth = require('../middleware/Auth');

// Create
router.post('/signup', userCtrl.signUp);

// Read
router.post('/login', userCtrl.login);
router.post('/isUserAuth', auth, userCtrl.isUserAuth);

// Delete
router.post('/deleteDatas', auth, userCtrl.deleteDatas);
router.post('/deleteAccount', auth, userCtrl.deleteAccount);

module.exports = router;