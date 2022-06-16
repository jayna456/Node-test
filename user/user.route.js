const express = require('express');
const { verifyToken } = require('../middleware/authorization');
const { imageUpload } = require('../middleware/fileUpload');
const { signUp, login, getProfile, updateProfile } = require('./user.controller');

const router = express.Router();

router.post('/sign-up',signUp);
router.post('/login',login)
router.get('/getProfile', verifyToken,getProfile)
router.put('/updateProfile', verifyToken, imageUpload.single('image'),updateProfile)

module.exports = router