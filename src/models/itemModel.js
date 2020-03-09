const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  
  ownerID: {
    type: String,
    //required: true
  },
  price: {
    type: Number,
    min: 1,
    required: true,
    validate: Number.isInteger
  },
  image: {
      type:String
  },
  description: {
      type:String
  }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;