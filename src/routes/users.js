const express = require('express');
const UserController = require('../controllers/user.controller');

const api = express.Router();

api.post('/login', UserController.signIn);

module.exports = api;