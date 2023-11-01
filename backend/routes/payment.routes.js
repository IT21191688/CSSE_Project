const express = require('express');
const paymentController = require('../controllers/payment.controller');

const router = express.Router();

router.post('/createPayment', paymentController.createPayment);
router.get('/getAllPayments', paymentController.getPayments);
router.get('/getOnePayment/:id', paymentController.getPaymentById);
router.put('/updatePayment/:id', paymentController.updatePayment);
router.delete('/deletePayment/:id', paymentController.deletePayment);

module.exports = router;
