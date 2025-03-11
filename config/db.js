const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
};
module.exports = connectDB;
