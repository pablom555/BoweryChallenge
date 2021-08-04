const Role = require('./../schemas/role');

async function saveRole (roleData) {
  const newRole = new Role();
  newRole.role = roleData.role
  return newRole.save();
}

module.exports = {
  saveRole
}