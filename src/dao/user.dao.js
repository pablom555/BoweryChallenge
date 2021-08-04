const User = require('./../schemas/user');

async function saveUser (userData) {
  const user = new User();
  user.name = userData.name;
  user.email = userData.email;
  user.password = userData.password;
  user.role = userData.role;

  return user.save();
}

module.exports = {
  saveUser
}