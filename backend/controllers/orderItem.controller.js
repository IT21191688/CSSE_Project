const orderItemsService = require('../services/orderItems.service');

const createOrderItems = async (req, res) => {
    try {
        const orderItemsData = req.body;
        const savedOrderItems = await orderItemsService.createOrderItems(orderItemsData);
        res.status(201).json(savedOrderItems);
    } catch (error) {
        console.error('Error creating orderItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrderItems = async (req, res) => {
    try {
        const orderItems = await orderItemsService.getOrderItems();
        res.status(200).json(orderItems);
    } catch (error) {
        console.error('Error fetching orderItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrderItemsById = async (req, res) => {
    try {
        const orderItems = await orderItemsService.getOrderItemsById(req.params.id);
        res.status(200).json(orderItems);
    } catch (error) {
        console.error('Error fetching orderItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/* const updateOrderItems = async (req, res) => {
    try {
        const updatedOrderItems = await orderItemsService.updateOrderItems(req.params.id, req.body);
        res.status(200).json(updatedOrderItems);
    } catch (error) {
        console.error('Error updating orderItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}; */

const updateOrderItems = async (req, res) => {
    try {
        const { order, item } = req.params;
        const updatedOrderItems = await orderItemsService.updateOrderItems(order, item, req.body);
        res.status(200).json(updatedOrderItems);
    } catch (error) {
        console.error('Error updating orderItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteOrderItems = async (req, res) => {
    try {
        await orderItemsService.deleteOrderItems(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting orderItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrderItemsByOrderID = async (req, res) => {
    try {
        const { orderId } = req.params;
        // console.log('Order ID:', orderId);
        const orderItems = await orderItemsService.getOrderItemsByOrderID(orderId);
        //console.log('Order Items:', orderItems);
        res.status(200).json(orderItems);
    } catch (error) {
        console.error('Error fetching order items by order ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createOrderItems,
    getOrderItems,
    getOrderItemsById,
    updateOrderItems,
    deleteOrderItems,
    getOrderItemsByOrderID
};
