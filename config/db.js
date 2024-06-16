import mongoose from 'mongoose'
import "dotenv/config.js";
// const MONGO_URI = process.env.MONGO_URI
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export {connectDB}
