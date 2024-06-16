import mongoose from 'mongoose'

/**
 * User Schema
 */


const userSchema = new mongoose.Schema({
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
  },
  {
    timestamps:true,
  }
);

  
const userModel = mongoose.models.user || mongoose.model("user", userSchema )
export default userModel

