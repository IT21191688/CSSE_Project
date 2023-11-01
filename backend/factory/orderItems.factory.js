const OrderItems = require('../models/orderItems.model');

// Factory function to create a new OrderItems instance
const createOrderItems = (data) => {
    return new OrderItems(data);
};

module.exports = {
    createOrderItems,
};