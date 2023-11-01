const Order = require('../models/order.model');

// Factory function to create a new Order instance
const createOrder = (data) => {
    return new Order(data);
};

module.exports = {
    createOrder,
};