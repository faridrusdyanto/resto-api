'use strict';
const service = require('../controller/user');
const express = require('express');
const router = express.Router();

router.get('/', service.index);
router.get('/data-user', service.getDataUser);
router.post('/add-user', service.addUser);
router.get('/data-user/:id', service.getDataUserById);
router.post('/change-password', service.changePassword);
router.post('/delete-user', service.deleteUser)

module.exports = router;