const mongoose = require('mongoose');
const { MONGODB_URI } = require('./constants.config');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('Error trying to connect to the DB');
});

db.once('open', () => {
  console.log(`Success connection to ${mongoose.connections[0].name} DB`);
});

module.exports = { db };