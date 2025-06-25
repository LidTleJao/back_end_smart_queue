import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not set in .env");

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  }
};