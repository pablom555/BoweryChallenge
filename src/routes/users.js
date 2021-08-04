const express = require('express');
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('./../middlewares/auth.middleware');

const api = express.Router();

api.post('/login', UserController.signIn);

api.use(AuthMiddleware.authenticate);

api.post('/', AuthMiddleware.isAdmin, UserController.signUp);

module.exports = api;