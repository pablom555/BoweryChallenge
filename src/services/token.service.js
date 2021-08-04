const jwt = require('jsonwebtoken');

class tokenService {

  static async encodeToken(payload, secret, expireTimeInMinutes = 3600) {

    try {
  
      const token = await jwt.sign(payload, secret, {
        expiresIn: expireTimeInMinutes,
      });
  
      return token;

    } catch (error) {
      throw new Error(`The token could not be generated: ${error}`);
    }
  }
  
  static async decodeToken(token, secret) {

    try {

      const decodePayload = await jwt.verify(token, secret);
  
      return decodePayload;

    } catch (error) {
      throw new Error(`Invalid token. The token could not be decoded: ${error}`);
    }
  }
}

module.exports = tokenService;