const express = require('express');
const invoiceController = require('../controllers/invoice.controller');
const router = express.Router();

router.post('/createInvoice', invoiceController.createInvoice);
router.get('/getAllInvoices', invoiceController.getInvoices);
router.get('/getOneInvoice/:id', invoiceController.getInvoiceById);
router.put('/updateInvoice/:id', invoiceController.updateInvoice);
router.delete('/deleteInvoice/:id', invoiceController.deleteInvoice);

module.exports = router;
