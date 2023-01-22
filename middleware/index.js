const express = require('express');
const pages = require('../controller/user');
const auth = require('./auth');
const verfication = require('./verification');
const router = express.Router();

// Daftarkan menu login
router.post('/api/v1/login', auth.login);

// alamat yang perlu otorisasi
router.get('/api/v1/data-user', verfication(), pages.getDataUser);

module.exports = router;
