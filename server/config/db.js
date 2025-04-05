import dotenv from 'dotenv';
dotenv.config(); // <--- add this line

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('ENV MONGO_URI:', process.env.MONGO_URI); // for debug
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is undefined');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
