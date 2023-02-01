'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');
const varification = require('../middleware/verification');

// Daftarkan menu login
// router.post('/login', auth.login);
// router.get('/', varification.isAllRole(), service.index);
// router.get('/data-user', varification.isAdmin(), service.getDataUser);
// router.post('/add-user', varification.isAdmin(), service.addUser);
// router.get('/data-user/:id', varification.isAllRole(), service.getDataUserById);
// router.post('/change-password', varification.isAllRole(), service.changePassword);
// router.post('/delete-user', varification.isAdmin(), service.deleteUser)

// ROUTING USER 
router.post('/add-user', userController.methodPost);
router.get('/data-user', userController.methodGet);
router.get('/data-user/:id', userController.methodGetId);
router.post('/delete-user', userController.methodDelete);

module.exports = router;