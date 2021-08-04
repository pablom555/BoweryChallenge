const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, 'Error in role Model DB: The role is required'],
    enum: ['Admin', 'End-User'],
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('roles', RoleSchema);