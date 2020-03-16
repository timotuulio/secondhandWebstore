
const mongoose = require('mongoose');

function connectDB() {
  mongoose.connect('mongodb://localhost/WWWProgramming', {useNewUrlParser: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
};

function disconnectDB() {
  mongoose.disconnect();
}

module.exports = {connectDB, disconnectDB};
