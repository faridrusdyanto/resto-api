'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/login');
const verification = require('../middleware/verification');

// ROUTING AUTH
router.post('/login', auth.login);
router.get('/', verification.isAllRole, userController.index);

// ROUTING USER 
router.post('/add-user', verification.isAdmin, userController.methodPost);
router.get('/data-user', verification.isAdmin, userController.methodGet);
router.get('/data-user/:id', verification.isAllRole, userController.methodGetId);
router.post('/delete-user', verification.isAdmin, userController.methodDelete);
router.post('/change-password', verification.isAllRole, userController.changePassword);

module.exports = router;