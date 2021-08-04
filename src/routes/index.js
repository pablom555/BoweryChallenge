const express = require('express');

const app = express();

app.use('/users', require('./users.js'));

module.exports = app;