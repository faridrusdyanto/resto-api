const express = require('express');
const auth = require('./auth');
const router = express.Router();
// var verifikasi = require('./verifikasi');

// Daftarkan menu login
router.post('/api/v1/login', auth.login);

// alamat yang perlu otorisasi
// router.get('/api/v1/rahasia', verifikasi(), auth.halamanRahasia);

module.exports = router;
