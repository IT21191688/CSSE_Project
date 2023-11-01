// factories/supplierFactory.js

const Supplier = require('../models/supplier');

class SupplierFactory {
    createSupplier(ordername, totalnew) {
        // You can add additional validation or customization here if needed.
        return new Supplier({ ordername, totalnew });
    }
}

module.exports = new SupplierFactory();
