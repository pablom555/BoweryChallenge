const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { RUNTIME_ENVIRONMENT, PORT } = require('./src/config/constants.config');

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Remove express header
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

console.log('Starting Server...');

// BBDD Conection
require('./src/config/database.config.js');

app
  .listen(PORT, () => {
    console.log(
      `Runing in ${RUNTIME_ENVIRONMENT.toUpperCase()} environment, port: ${PORT}`,
    );
  })
  .on('error', (error) => {
    console.log(error.message);
    console.log(`Listen method failed. Unable to listen on port ${PORT}`);
  });