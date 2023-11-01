const OrderItems = require('../models/orderItems.model');
const orderItemsFactory = require('../factory/orderItems.factory');

const createOrderItems = async (data) => {
    try {
        const orderItems = orderItemsFactory.createOrderItems(data);
        const savedOrderItems = await orderItems.save();
        return savedOrderItems;
    } catch (error) {
        console.error('Error creating orderItems:', error);
        throw new Error('OrderItems creation failed');
    }
};

const getOrderItems = async () => {
    try {
        const orderItems = await OrderItems.find();
        return orderItems;
    } catch (error) {
        console.error('Error fetching orderItems:', error);
        throw new Error('Fetching orderItems failed');
    }
};

const getOrderItemsById = async (id) => {
    try {
        const orderItems = await OrderItems.findById(id);
        if (!orderItems) {
            throw new Error('OrderItems not found');
        }
        return orderItems;
    } catch (error) {
        console.error('Error fetching orderItems:', error);
        throw new Error('Fetching orderItems failed');
    }
};

/* const updateOrderItems = async (id, data) => {
    try {
        const updatedOrderItems = await OrderItems.findByIdAndUpdate(id, data, { new: true });
        if (!updatedOrderItems) {
            throw new Error('OrderItems not found');
        }
        return updatedOrderItems;
    } catch (error) {
        console.error('Error updating orderItems:', error);
        throw new Error('OrderItems update failed');
    }
}; */

const updateOrderItems = async (order, item, data) => {
    try {
        const filter = { order, item };
        const updatedOrderItems = await OrderItems.findOneAndUpdate(filter, data, { new: true });

        if (!updatedOrderItems) {
            throw new Error('OrderItems not found');
        }

        return updatedOrderItems;
    } catch (error) {
        console.error('Error updating orderItems:', error);
        throw new Error('OrderItems update failed');
    }
};




const deleteOrderItems = async (id) => {
    try {
        const orderItems = await OrderItems.findById(id);
        if (!orderItems) {
            throw new Error('OrderItems not found');
        }
        await orderItems.remove();
    } catch (error) {
        console.error('Error deleting orderItems:', error);
        throw new Error('OrderItems deletion failed');
    }
};

const getOrderItemsByOrderID = async (orderId) => {
    try {
        const orderItems = await OrderItems.find({ order: orderId })
            .populate('item')
            .exec();

        if (!orderItems) {
            throw new Error('No order items found for the given order ID.');
        }

        return orderItems;
    } catch (error) {
        console.error('Error fetching order items by order ID:', error);
        throw new Error('Fetching order items failed');
    }
};


module.exports = {
    createOrderItems,
    getOrderItems,
    getOrderItemsById,
    updateOrderItems,
    deleteOrderItems,
    getOrderItemsByOrderID,

};
