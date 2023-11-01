const express = require('express');
const orderItemsController = require('../controllers/orderItem.controller');

const router = express.Router();

router.post('/createOrder', orderItemsController.createOrderItems);
router.get('/getAllOrders', orderItemsController.getOrderItems);
router.get('/getOneOrder/:id', orderItemsController.getOrderItemsById);
//router.put('/updateOrder/:id/:ItemId', orderItemsController.updateOrderItems);
router.put('/updateOrderItems/:order/:item', orderItemsController.updateOrderItems);
router.delete('/deleteOrder/:id', orderItemsController.deleteOrderItems);
router.get('/getOrderItemsByOrderID/:orderId', orderItemsController.getOrderItemsByOrderID);


module.exports = router;