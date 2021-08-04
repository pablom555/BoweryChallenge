const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Error in user Model DB: The name is required'],
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'Error in user Model DB: The email is required'],
  },

  password: {
    type: String,
    select: true,
    required: [true, 'Error in user Model DB: The password is required'],
    default: 'pending',
  },

  role: {
    type: Schema.Types.ObjectId,
    ref: 'roles',
    required: [true, 'Error in user Model DB: The role is required'],
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },

});

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const encript = await bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

  user.password = encript;
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('user', UserSchema);