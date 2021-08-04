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

async function getUsers (filter) {
  return User.find(filter).populate('role', ['role']);
}

async function deleteUser (userID) {
  return User.findByIdAndDelete(userID);
}

async function updateUser (userData) {
  const {id, password, ...rest} = userData;
  return User.findByIdAndUpdate(id, rest, { new: true },
    (err, doc) => {
      if (err) throw new Error(err);
      doc.password = password;
      return doc.save();
    },
  ).exec();
}

module.exports = {
  saveUser,
  getUser,
  getUserByID,
  getUsers,
  deleteUser,
  updateUser
}