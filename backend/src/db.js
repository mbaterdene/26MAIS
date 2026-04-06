import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoUri);

    isConnected = true;
    console.log("✅ Connected to MongoDB");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
}

export async function disconnectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    isConnected = false;
    console.log("✅ Disconnected from MongoDB");
  }
}

export function getDB() {
  if (!isConnected) {
    throw new Error("Database is not connected. Call connectDB() first.");
  }
  return mongoose.connection;
}
