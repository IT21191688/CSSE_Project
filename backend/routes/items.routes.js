const express = require('express');
const itemController = require('../controllers/items.controller'); // Correct the import path and controller name

const router = express.Router();

router.post('/createItem', itemController.createItems); // Use the correct controller function name
router.get('/getAllItems', itemController.getItems); // Use the correct controller function name
router.get('/getOneItem/:id', itemController.getItemsById); // Use the correct controller function name
router.put('/updateItem/:id', itemController.updateItems); // Use the correct controller function name
router.delete('/deleteItem/:id', itemController.deleteItems); // Use the correct controller function name

module.exports = router;
