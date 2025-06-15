import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};
