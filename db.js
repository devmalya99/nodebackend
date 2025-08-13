// db/db.js
import mongoose from "mongoose";

export const connectDB = async (retries = 5, delay = 5000) => {
  if (!process.env.MONGODB_URI_DEV) {
    console.error("MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI_DEV);
    console.log("✅ MongoDB connected successfully");
    console.log(`Server is running on ${process.env.MONGODB_URI_DEV} mode`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    if (retries > 0) {
      console.log(
        `🔁 Retrying connection in ${
          delay / 1000
        }s... (${retries} attempts remaining)`
      );
      setTimeout(() => connectDB(retries - 1, delay), delay);
    } else {
      console.error("💥 Failed to connect to MongoDB after multiple attempts");
      process.exit(1);
    }
  }
};
