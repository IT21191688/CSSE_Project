// routes/supplierRoutes.js

const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// POST route for confirming an order
router.post('/confirm-order', supplierController.confirmOrder);

module.exports = router;
