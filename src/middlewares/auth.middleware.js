const { SECRET_JWT } = require('../config/constants.config')
const TokenService = require('../services/token.service');
const UserService = require('../services/user.service');

class AuthMiddleware {

  static async authenticate(req, res, next) {

    try {

      if (!req.headers.authorization) {
        return res.status(401).send('You must signIn.');
      }
  
      const token = req.headers.authorization;
      const decodePayload = await TokenService.decodeToken(token, SECRET_JWT);

      const userDB = await UserService.getUser(decodePayload.sub)
      if (!userDB)
        return res.status(401).send(createJSONResponse(false, 'Invalid token.'));

      const { _id, name, email, role } = userDB;
      req.auth = { user: { _id, name, email, role } };
  
      next();

    } catch (error) {
      return res.status(401).send('You must signIn.');
    }
  }

  static isAdmin(req, res, next) {
    const { user } = req.auth;

    if (user.role.role !== 'Admin')
      return res.status(403).send('The User must be ADMIN')
  
    next();
  }

  static isEndUserOrAdmin(req, res, next) {
    const { user } = req.auth;
    
    if (user.role.role !== 'End-User' && user.role.role !== 'Admin')
      return res.status(403).send('The User must be End-User or Admin')
  
    next();
  } 
  
}

module.exports = AuthMiddleware;