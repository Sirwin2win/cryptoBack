const mongoose = require('mongoose')

/**
 * User Schema
 */


const adminSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "name not provided "],
    },
    email: {
      type: String,
      required: [true, "please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please add a password']
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps:true,
  }
);
  
  module.exports= Admin = mongoose.model('Admin', adminSchema)

