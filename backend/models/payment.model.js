const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const PaymentSchema = new Schema({

    amount: {
        type: String,
        required: true
    },
    orderid: {
        type: String,
        required: true
    },
    cardno: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    paymentstatus: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;