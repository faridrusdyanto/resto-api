'use strict';
const express = require('express');
const router = express.Router();
const auth = require('../middleware/login');
const verification = require('../middleware/verification');
const userController = require('../controller/userController');
const categoryController = require('../controller/categoryController');

// ROUTING AUTH
router.post('/login', auth.login);
router.get('/', verification.isAllRole, userController.index);

// ROUTING USER 
router.post('/add-user', verification.isAdmin, userController.methodPost);
router.get('/data-user', verification.isAdmin, userController.methodGet);
router.get('/data-user/:id', verification.isAllRole, userController.methodGetId);
router.post('/delete-user', verification.isAdmin, userController.methodDelete);
router.post('/change-password', verification.isAllRole, userController.changePassword);

// ROUTING CATEGORY
router.post('/add-category', verification.isAdmin, categoryController.methodPost);
router.get('/data-category', categoryController.methodGet);
router.get('/data-category/:id', categoryController.methodGetId);
router.post('/delete-category', verification.isAdmin, categoryController.methodDelete);
router.post('/update-category', verification.isAdmin, categoryController.methodUpdate);

module.exports = router;