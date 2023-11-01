const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const OrderItemsSchema = new Schema({

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    qty: {
        type: Number,
        required: true
    },
    avgunitprice: {
        type: Number,
        required: true
    },
    itemtotal: {
        type: Number,
        required: true
    }
   

}, {
    timestamps: true
})

const OrderItems = mongoose.model("OrderItems", OrderItemsSchema);

module.exports = OrderItems;