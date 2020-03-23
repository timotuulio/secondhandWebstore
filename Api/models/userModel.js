const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  role: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bankAccount: {
      type: String
  },
  phoneNumber: {
      type: String
  },
  address: {
      type: String
  },
  password: {
      type: String,
      required: true
  },
  balance:{
      type: Number
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
