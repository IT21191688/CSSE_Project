const Order = require('../models/order.model');
const orderFactory = require('../factory/order.factory');

const createOrder = async (data) => {
    try {
        const order = orderFactory.createOrder(data);
        const savedOrder = await order.save();
        return savedOrder;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Order creation failed');
    }
};

const getOrders = async () => {
    try {
        const order = await Order.find();
        return order;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw new Error('Fetching order failed');
    }
};

const getOrderById = async (id) => {
    try {
        const order = await Order.findById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw new Error('Fetching order failed');
    }
};

const updateOrder = async (id, data) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true });
        if (!updatedOrder) {
            throw new Error('Order not found');
        }
        return updatedOrder;
    } catch (error) {
        console.error('Error updating order:', error);
        throw new Error('Order update failed');
    }
};

const deleteOrder = async (id) => {
    try {
        const order = await Order.findByIdAndRemove(id);
        if (!order) {
            // Handle the case where the order is not found
            throw new Error('Order not found: The order with the provided ID does not exist.');
        }
        // Successful deletion
        return order;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw new Error('Order deletion failed');
    }
};



module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
