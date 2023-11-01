const express = require('express');
const inventoryController = require('../controllers/inventory.controller');

const router = express.Router();

router.post('/createInventory', inventoryController.createInventory);
router.get('/getAllInventory', inventoryController.getInventory);
router.get('/getOneInventory/:id', inventoryController.getInventoryById);
router.put('/updateInventory/:id', inventoryController.updateInventory);
router.delete('/deleteInventory/:id', inventoryController.deleteInventory);

module.exports = router;