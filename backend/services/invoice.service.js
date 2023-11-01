const Invoice = require('../models/invoice.model');
const InvoiceFactory = require('../factory/invoice.factory');

class InvoiceService {
    static async createInvoice(data) {
        try {
            const invoice = InvoiceFactory.createInvoice(data);
            const savedInvoice = await invoice.save();
            return savedInvoice;
        } catch (error) {
            throw new Error('Invoice creation failed');
        }
    }

    static async getInvoices() {
        try {
            const invoices = await Invoice.find();
            return invoices;
        } catch (error) {
            throw new Error('Fetching invoices failed');
        }
    }

    static async getInvoiceById(id) {
        try {
            const invoice = await Invoice.findById(id);
            if (!invoice) {
                throw new Error('Invoice not found');
            }
            return invoice;
        } catch (error) {
            throw Error('Fetching invoice failed');
        }
    }

    static async updateInvoice(id, data) {
        try {
            const updatedInvoice = await Invoice.findByIdAndUpdate(id, data, { new: true });
            if (!updatedInvoice) {
                throw new Error('Invoice not found');
            }
            return updatedInvoice;
        } catch (error) {
            throw new Error('Invoice update failed');
        }
    }

    static async deleteInvoice(id) {
        try {
            const deletedInvoice = await Invoice.findByIdAndRemove(id);
            if (!deletedInvoice) {
                throw new Error('Invoice not found');
            }
        } catch (error) {
            throw new Error('Invoice deletion failed');
        }
    }
}

module.exports = InvoiceService;
