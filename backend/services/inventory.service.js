//const Inventory = require('../models/inventory.model');
const inventoryFactory = require('../factory/inventory.factory');
const Inventory = require('../models/inventory.model');

const createinventory = async (data) => {
    try {
        const inventoryItem = inventoryFactory.createinventory(data);
        const savedInventory = await inventoryItem.save();
        return savedInventory;
    } catch (error) {
        console.error('Error creating inventory:', error);
        throw new Error('Inventory creation failed');
    }
};

const getinventory = async () => {
    try {
        const inventoryItems = await Inventory.find(); // Use 'Inventory' instead of 'inventoryItems'
        return inventoryItems;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw new Error('Fetching inventory failed');
    }
};


const getinventoryById = async (id) => {
    try {
        const inventory = await Inventory.findById(id); // Use 'Inventory' instead of 'inventory'
        if (!inventory) {
            throw new Error('Inventory not found');
        }
        return inventory;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw new Error('Fetching inventory failed');
    }
};


const updateinventory = async (id, data) => {
    try {
        const updatedinventory = await Inventory.findByIdAndUpdate(id, data, { new: true });
        if (!updatedinventory) {
            throw new Error('inventory not found');
        }
        return updatedinventory;
    } catch (error) {
        console.error('Error updating inventory:', error);
        throw new Error('inventory update failed');
    }
};

const deleteinventory = async (id) => {
    try {
        const deletedInventory = await Inventory.findByIdAndRemove(id);
        if (!deletedInventory) {
            // Handle the case where the order is not found
            throw new Error('Order not found: The order with the provided ID does not exist.');
        }
        // Successful deletion
        return deletedInventory;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw new Error('Order deletion failed');
    }
};




module.exports = {
    createinventory,
    getinventory,
    getinventoryById,
    updateinventory,
    deleteinventory,
};
