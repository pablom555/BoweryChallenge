const UserDao = require('./../dao/user.dao');
const TokenService = require('./../services/token.service');
const { SECRET_JWT } = require('./../config/constants.config')

async function signIn(email, password) {
 
  const userDB = await UserDao.getUser({ email });
  if (!userDB) return;

  const validatePassword = await userDB.comparePassword(password);
  if (!validatePassword) return;

  const tokenPayload = {
    sub: userDB._id,
    name: userDB.name,
    email: userDB.email,
    role: userDB.role,
  };

  const genToken = await TokenService.encodeToken(tokenPayload, SECRET_JWT);

  return { user: tokenPayload, token: genToken };

}

module.exports = {
  signIn
}