const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');
const { sendError } = require('../utils');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path : `../test.env` });

const { saveNewUser, findByEmail } = require('../controllers/user.controller');
const secret = process.env.SECRET_KEY;

const createAndGetToken = (res, username, userId) => {

  jwt.sign({ userId: username }, process.env.SECRET_KEY, { expiresIn: '24h'}, function(err, token) {
    if(err) {
      sendError(res, err.message);
    } else {
       res.status(200).json({

        success: true,
        username,
        token,
        userId

      })
    }

  })

}

const sample = () => {
  return res.json({
    success: true,
    message: 'this is a sample function',
  })
}

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decode = jwt.verify(token, secret);

    console.log({ decode });

    return next();

  } catch(error) {
    return res.json({
      success: false,
      message: error.message,
    })
  }
}

router.route('/testing')
.get(authenticateUser, sample)


router.route('/signup')
.post( async (req, res) => {

    const { email } = req.body;

    const user = await findByEmail(res, email);

    if(user) {
      return res.json({
        success: false,
        message: 'User already exists'
      })
    }

    const savedUser = await saveNewUser(res, req.body);

    return createAndGetToken(res, savedUser.username, savedUser._id)
    
})

router.route('/login')
.post( async (req, res) => {
    const { email, password } = req.body;

    const user = await findByEmail(res, email);

    if(!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) {
      return res.status(403).json({
        success: false,
        message: 'Incorrect password!, Please try again',
      })
    }

    return createAndGetToken(res, user.username, user._id)

})

module.exports = router;

