// db/db.js
import mongoose from "mongoose";

export const connectDB = async (retries = 5, delay = 5000) => {
  let mongo_url;
  if (process.env.ENV_MODE == "development") {
    mongo_url = process.env.MONGODB_URI_DEV;
  } else {
    mongo_url = process.env.MONGODB_URI_PROD;
  }
  if (!mongo_url) {
    console.error("MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongo_url);
    console.log("✅ MongoDB connected successfully");
    console.log(`Server is running on ${process.env.ENV_MODE} mode`)
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
