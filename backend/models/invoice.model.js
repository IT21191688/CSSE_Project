const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    ordername: {
        type: String,
        required: true
    },
    ordertotal: {
        type: Number,
        required: true
    },
    orderstatus: {
        type: String,
        required: true
    },
    actualprice: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
