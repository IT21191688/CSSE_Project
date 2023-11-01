const Payment = require('../models/payment.model');

// Factory function to create a new Payment instance
const createPayment = (data) => {
    return new Payment(data);
};

module.exports = {
    createPayment,
};
