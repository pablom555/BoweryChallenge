const UserDao = require('./../dao/user.dao');
const RoleDao = require('./../dao/role.dao');
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

async function getUser(userID) {
  const userDB = await UserDao.getUserByID(userID);
  return userDB;
}

async function signUp(userData) { 
  const { role } = userData;

  const roleDB = await RoleDao.getRoleByID(role);
  if (!roleDB) throw new Error('Invalid Role');

  const userCreated = await UserDao.saveUser(userData)
  return userCreated
}

module.exports = {
  signIn,
  getUser,
  signUp
}