const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  role: {
      type: String
      //required: true
  },
  email: {
    type: String,
    required: true
  },
  bankAccount: {
      type: String
  },
  email: {
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
  selfLink: {
      type: String,
      //required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
