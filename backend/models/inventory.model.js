const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number, // Change 'number' to 'Number'
        required: true
    },
    avgunitprice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
