const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    amount: {
        type: Number
    },
    date: {
        type: String
    }


});

const Receipt = mongoose.model('Receipt', ReceiptSchema);

module.exports = Receipt;
