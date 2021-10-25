/* ROUTES VERS LE CONTROLLER "user.js" */

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const auth = require('../middleware/auth');

router.post('/signup', authCtrl.signUp);
router.post('/login', authCtrl.login);

router.post('/isUserAuth', auth, authCtrl.isUserAuth);

router.post('/deleteDatas', auth, authCtrl.deleteDatas);
router.post('/deleteAccount', auth, authCtrl.deleteAccount);

module.exports = router;