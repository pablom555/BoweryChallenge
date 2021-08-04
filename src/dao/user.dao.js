const User = require('./../schemas/user');
const Role = require('./../schemas/role');

async function saveUser (userData) {
  const user = new User();
  user.name = userData.name;
  user.email = userData.email;
  user.password = userData.password;
  user.role = userData.role;

  return user.save();
}

async function getUser (filter) {
  return User.findOne(filter).populate('role', ['role']);
}

async function getUserByID (userID) {
  return User.findById(userID).populate('role', ['role']);
}

module.exports = {
  saveUser,
  getUser,
  getUserByID
}