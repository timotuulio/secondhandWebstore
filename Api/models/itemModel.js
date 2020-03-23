const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    ownerId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        min: 1,
        required: true,
        validate: Number.isInteger
    },

    img: {
        data: Buffer,
        contentType: String
    },

    description: {
        type: String,
        required: true
    },
    created: {
        type: String
    },
    status: {
        type: String
    }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
