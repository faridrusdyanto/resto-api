'use strict';
const express = require('express');
const router = express.Router();
const auth = require('../middleware/login');
const verification = require('../middleware/verification');
const userController = require('../controller/userController');
const categoryController = require('../controller/categoryController');
const productController = require('../controller/productController');
const trxController = require('../controller/trxController');

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
router.get('/data-category', verification.isAdmin, categoryController.methodGet);
router.get('/category-and-product', categoryController.dataCategoryAndProduct); // List menu untuk customer
router.get('/data-category/:id', verification.isAdmin, categoryController.methodGetId);
router.post('/delete-category', verification.isAdmin, categoryController.methodDelete);
router.post('/update-category', verification.isAdmin, categoryController.methodUpdate);

// ROUTING PRODUCT
router.post('/add-product', verification.isAdmin, productController.methodPost);
router.post('/delete-product', verification.isAdmin, productController.methodDelete);
router.post('/update-product', verification.isAdmin, productController.methodUpdate);
router.get('/data-product', verification.isAllRole, productController.methodGet);
router.get('/data-product-and-category', productController.dataProductAndCategory); // List menu untuk customer
router.get('/data-product/:id', productController.methodGetId);
router.post('/update-available', verification.isAllRole, productController.methodAvailable);

// TRANSACTIONS
router.post('/add-trx', trxController.methodPost);
router.get('/data-trx', trxController.methodGet);
router.get('/data-trx/:id', trxController.methodGetId);

module.exports = router;