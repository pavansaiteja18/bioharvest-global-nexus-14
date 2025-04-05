
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('ENV MONGO_URI:', process.env.MONGO_URI ? 'Exists' : 'Missing');
    
    if (!process.env.MONGO_URI) {
      console.error('-------------------------------------------------------------');
      console.error('MONGO_URI is undefined in environment variables');
      console.error('Please create a .env file in the server directory with:');
      console.error('MONGO_URI=your_mongodb_connection_string');
      console.error('JWT_SECRET=your_jwt_secret_key');
      console.error('-------------------------------------------------------------');
      throw new Error('MONGO_URI is undefined');
    }

    // Use newer connection options with timeouts
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
      socketTimeoutMS: 30000, // 30 seconds timeout for socket operations
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
    
    // Test database with a ping
    const adminDb = conn.connection.db.admin();
    await adminDb.ping();
    console.log('Database ping successful');
    
    return conn;
  } catch (error) {
    if (error instanceof Error) {
      console.error('-------------------------------------------------------------');
      console.error('MongoDB connection failed:', error.message);
      if (error.message.includes('ECONNREFUSED')) {
        console.error('Could not connect to MongoDB server. Please check:');
        console.error('1. MongoDB server is running');
        console.error('2. MONGO_URI in .env file is correct');
        console.error('3. Network allows connection to MongoDB server');
      } else if (error.message.includes('Authentication failed')) {
        console.error('Authentication to MongoDB failed. Please check:');
        console.error('1. Username and password in MONGO_URI are correct');
        console.error('2. User has access to the database');
      }
      console.error('-------------------------------------------------------------');
    } else {
      console.error('MongoDB connection failed:', error);
    }
    process.exit(1);
  }
};

export default connectDB;
