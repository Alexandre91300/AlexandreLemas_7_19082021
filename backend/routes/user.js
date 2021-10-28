/* ROUTES VERS LE CONTROLLER "user.js" */

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);

router.post('/isUserAuth', auth, userCtrl.isUserAuth);

router.post('/deleteDatas', auth, userCtrl.deleteDatas);
router.post('/deleteAccount', auth, userCtrl.deleteAccount);

module.exports = router;