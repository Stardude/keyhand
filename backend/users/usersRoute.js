const express = require('express');
const router = new express.Router();

const userController = require('./userController');

router.post('/', userController.saveUserData);
router.get('/', userController.recognize);
router.get('/authByPassword', userController.authByPassword);
router.get('/getAllUsers', userController.getAllUsers);

module.exports = router;