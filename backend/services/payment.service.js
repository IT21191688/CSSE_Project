const Payment = require('../models/payment.model');
const paymentFactory = require('../factory/payment.factory');

const createPayment = async (data) => {
    try {
        const payment = paymentFactory.createPayment(data);
        const savedPayment = await payment.save();
        return savedPayment;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw new Error('Payment creation failed');
    }
};

const getPayments = async () => {
    try {
        const payments = await Payment.find();
        return payments;
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw new Error('Fetching payments failed');
    }
};

const getPaymentById = async (id) => {
    try {
        const payment = await Payment.findById(id);
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    } catch (error) {
        console.error('Error fetching payment:', error);
        throw new Error('Fetching payment failed');
    }
};

const updatePayment = async (id, data) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(id, data, { new: true });
        if (!updatedPayment) {
            throw new Error('Payment not found');
        }
        return updatedPayment;
    } catch (error) {
        console.error('Error updating payment:', error);
        throw new Error('Payment update failed');
    }
};

const deletePayment = async (id) => {
    try {
        const deletedPayment = await Payment.findByIdAndRemove(id);

        if (!deletedPayment) {
            throw new Error('Payment not found');
        }
    } catch (error) {
        console.error('Error deleting payment:', error);
        throw new Error('Payment deletion failed');
    }
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};
