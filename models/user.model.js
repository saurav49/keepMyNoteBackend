
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

  username: {
    type: String,
    trim: true,
    required: 'Username is Required',
  },

  email: {
    type: String,
    trim: true,
    required: 'Email is Required',
  },

  password: {
    type: String,
    trim: true,
    required: 'Password is Required',
  }

}, { versionKey: false }, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { User };
