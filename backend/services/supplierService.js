
const SupplierFactory = require('../factories/supplierFactory');
const Supplier = require('../models/supplier');

class SupplierService {
    async updateOrderConfirmation(orderId, newTotal) {
        // Use the SupplierFactory to create a new Supplier instance
        const updatedSupplier = await Supplier.findByIdAndUpdate(orderId, { totalnew: newTotal }, { new: true });
        return updatedSupplier;
    }
}

module.exports = new SupplierService();
