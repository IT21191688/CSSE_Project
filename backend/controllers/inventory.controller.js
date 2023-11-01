const inventoryService = require('../services/inventory.service');

const createInventory = async (req, res) => {
    try {
        const inventoryData = req.body;
        const savedInventory = await inventoryService.createinventory(inventoryData);
        res.status(201).json(savedInventory);
    } catch (error) {
        console.error('Error creating inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInventory = async (req, res) => {
    try {
        const inventoryItems = await inventoryService.getinventory();
        res.status(200).json(inventoryItems);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInventoryById = async (req, res) => {
    try {
        const inventory = await inventoryService.getinventoryById(req.params.id);
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateInventory = async (req, res) => {
    try {
        const updatedInventory = await inventoryService.updateinventory(req.params.id, req.body);
        res.status(200).json(updatedInventory);
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteInventory = async (req, res) => {
    
    try {
        console.log(req.params.id)
        await inventoryService.deleteinventory(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createInventory,
    getInventory,
    getInventoryById,
    updateInventory,
    deleteInventory,
};
