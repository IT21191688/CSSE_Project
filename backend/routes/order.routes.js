const express = require('express');
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.post('/createOrder', orderController.createOrder);
router.get('/getAllOrders', orderController.getOrders);
router.get('/getOneOrder/:id', orderController.getOrderById);
router.put('/updateOrder/:id', orderController.updateOrder);
router.delete('/deleteOrder/:id', orderController.deleteOrder);

module.exports = router;