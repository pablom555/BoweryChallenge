const { db } = require('./src/config/database.config');
const UserDao = require('./src/dao/user.dao');
const RoleDao = require('./src/dao/role.dao');

const exec = async () => {

  const RoleAdmin = await RoleDao.saveRole({role: 'Admin'});
  const RoleUser = await RoleDao.saveRole({role: 'End-User'});
  
  const UserAdmin = await UserDao.saveUser({name: 'User Admin', email: 'admin@bowerys.com', password: 'pass123', role: RoleAdmin._id})
  const UserEnd = await UserDao.saveUser({name: 'User End', email: 'user@bowerys.com', password: 'pass123', role: RoleUser._id})

  console.log('Users created: ', UserAdmin.email, UserEnd.email);
  console.log('Users Password: pass123')

  process.exit(0);
}

db.once('open', exec);