const paymentService = require('../services/payment.service');

const createPayment = async (req, res) => {
    try {
        const paymentData = req.body;
        const savedPayment = await paymentService.createPayment(paymentData);
        res.status(201).json(savedPayment);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPayments = async (req, res) => {
    try {
        const payments = await paymentService.getPayments();
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        res.status(200).json(payment);
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await paymentService.updatePayment(req.params.id, req.body);
        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePayment = async (req, res) => {
    try {
        await paymentService.deletePayment(req.params.id);
        res.status(204).send(); // Status 204 indicates that the request was successful with no content to return.
    } catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};
