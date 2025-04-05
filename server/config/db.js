import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('ENV MONGO_URI:', process.env.MONGO_URI ? 'Exists' : 'Missing');

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is undefined');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
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
