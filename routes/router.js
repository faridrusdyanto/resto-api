'use strict';
const service = require('../controller/userController');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const varification = require('../middleware/verification');

// Daftarkan menu login
router.post('/login', auth.login);
router.get('/', varification(), service.index);
router.get('/data-user', varification(), service.getDataUser);
router.post('/add-user', varification(), service.addUser);
router.get('/data-user/:id', service.getDataUserById);
router.post('/change-password', service.changePassword);
router.post('/delete-user', varification(), service.deleteUser)

module.exports = router;