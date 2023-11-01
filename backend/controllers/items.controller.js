const itemsService = require('../services/items.service');

const createItems = async (req, res) => {
    try {
        const itemsData = req.body;
        const savedItems = await itemsService.createitems(itemsData);
        res.status(201).json(savedItems);
    } catch (error) {
        console.error('Error creating items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getItems = async (req, res) => {
    try {
        const items = await itemsService.getitems();
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getItemsById = async (req, res) => {
    try {
        const items = await itemsService.getItemsById(req.params.id);
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateItems = async (req, res) => {
    try {
        const updatedItems = await itemsService.updateItems(req.params.id, req.body);
        res.status(200).json(updatedItems);
    } catch (error) {
        console.error('Error updating items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteItems = async (req, res) => {
    try {
        await itemsService.deleteItems(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createItems,
    getItems,
    getItemsById,
    updateItems,
    deleteItems,
};
