
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('ENV MONGO_URI:', process.env.MONGO_URI ? 'Exists' : 'Missing');

    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is undefined in environment variables');
      console.error('Make sure you have created a .env file in the server directory with MONGO_URI and JWT_SECRET');
      throw new Error('MONGO_URI is undefined');
    }

    // Use newer connection options
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB connection failed:', error.message);
    } else {
      console.error('MongoDB connection failed:', error);
    }
    process.exit(1);
  }
};

export default connectDB;
