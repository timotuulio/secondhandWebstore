const mongoose = require('mongoose');
const Item = require('./itemModel');

const ItemsOfUserSchema = new mongoose.Schema({
  userId: {
      type: String,
      required: true
  },
  items: [Item]
});

const ItemsOfUser = mongoose.model('ItemsOfUser', ItemsOfUserSchema);

module.exports = ItemsOfUser;
