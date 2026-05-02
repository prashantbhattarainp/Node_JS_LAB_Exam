import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/auth");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}

export default connectDB;