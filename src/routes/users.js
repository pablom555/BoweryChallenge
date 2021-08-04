const express = require('express');
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('./../middlewares/auth.middleware');

const api = express.Router();

api.post('/login', UserController.signIn);

api.use(AuthMiddleware.authenticate);

api.post('/', AuthMiddleware.isAdmin, UserController.signUp);

api.get('/', AuthMiddleware.isAdmin, UserController.getUsers);

api.get('/:id', AuthMiddleware.isAdmin, UserController.getUser);

api.delete('/:id', AuthMiddleware.isAdmin, UserController.deleteUser)

module.exports = api;