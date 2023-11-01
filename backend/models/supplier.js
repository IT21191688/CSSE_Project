const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SupplierSchema = new Schema({

    ordername: {
        type: String,
        required: true
    },
    totalnew: {
        type: double,
        required: true
    }

}, {
    timestamps: true
})

const Supplier = mongoose.model("Supplier", SupplierSchema);

module.exports = Supplier;