import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Missing DATABASE_URL environment variable");
  }
  if (mongoose.connection.readyState >= 1) return;
  try {
    // mongoose v7 has sensible defaults; no extra options required
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
};