const Invoice = require('../models/invoice.model');

const createInvoice = (data) => {
    return new Invoice(data);
};

module.exports = {
    createInvoice,
};
