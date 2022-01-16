const mongoose = require('mongoose');
require('dotenv').config({ path : `../test.env` });

const connectToDb = async () => {
  try {
    const response = await mongoose.connect(process.env.DATABSE_URL);
    console.log('Connection Successful To The MongoDB Backend');
  } catch(error) {
    console.log('Something went wrong with the mongoDB connection', error);
  }
}

module.exports = { connectToDb }