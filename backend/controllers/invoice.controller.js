const InvoiceService = require('../services/invoice.service');

const createInvoice = async (req, res) => {
    try {
        const invoiceData = req.body;
        const savedInvoice = await InvoiceService.createInvoice(invoiceData);
        res.status(201).json(savedInvoice);
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInvoices = async (req, res) => {
    try {
        const invoices = await InvoiceService.getInvoices();
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInvoiceById = async (req, res) => {
    try {
        const invoice = await InvoiceService.getInvoiceById(req.params.id);
        res.status(200).json(invoice);
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateInvoice = async (req, res) => {
    try {
        const updatedInvoice = await InvoiceService.updateInvoice(req.params.id, req.body);
        res.status(200).json(updatedInvoice);
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        await InvoiceService.deleteInvoice(req.params.id);
        res.status(204).send(); // Status 204 indicates that the request was successful with no content to return.
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};
