// controllers/supplierController.js

const supplierService = require('../services/supplierService');

class supplierController {
    async confirmOrder(req, res) {
        try {
            const { orderId, newTotal } = req.body;
            const updatedSupplier = await supplierService.updateOrderConfirmation(orderId, newTotal);
            res.json(updatedSupplier);
        } catch (error) {
            res.status(500).json({ error: 'Failed to confirm order' });
        }
    }
}

module.exports = new supplierController();
