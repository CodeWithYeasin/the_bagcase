import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = global as typeof globalThis & { mongoose: MongooseCache };

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = { conn: null, promise: null };
}

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  if (globalForMongoose.mongoose.conn) {
    return globalForMongoose.mongoose.conn;
  }

  if (!globalForMongoose.mongoose.promise) {
    globalForMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  globalForMongoose.mongoose.conn = await globalForMongoose.mongoose.promise;
  return globalForMongoose.mongoose.conn;
}
