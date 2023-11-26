// Importing mongoose for database connection.
import mongoose from 'mongoose';

// Function to connect to MongoDB.
const connectDB = async () => {
  try {
    // Allowing flexible queries in mongoose.
    mongoose.set('strictQuery', false);
    
    // Establishing the connection to MongoDB using the provided URL.
    const conn = await mongoose.connect(process.env.MONGO_URL);

    // Logging a successful connection message.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Logging an error message and exiting the process in case of connection failure.
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Exporting the connectDB function.
export default connectDB;
