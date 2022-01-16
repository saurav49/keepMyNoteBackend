const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { sendError } = require('../utils');

const findByEmail = async (res, email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    sendError(res, error.message);
  }
}


const saveNewUser = async (res, { username, email, password }) => {
  if(!password) {
    return res.json({
      success: false,
      message: 'Password is Required'
    })
  }

  try {

    const newUser = new User({ username, email, password });

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // set user password to hash password
    newUser.password  = await bcrypt.hash(newUser.password, salt);

    const savedUser = await newUser.save();

    return savedUser;


  } catch(error) {
    sendError(res, error.message);
  }

}

module.exports = { saveNewUser, findByEmail };
