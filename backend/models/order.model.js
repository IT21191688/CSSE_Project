const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;