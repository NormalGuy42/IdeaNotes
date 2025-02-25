import mongoose, { Connection } from "mongoose";

// Declaring a variable to store the cached database connection
let cachedConnection: Connection | null = null;


// export async function connectToMongoDB() {
//     try {
//         if (mongoose.connection.readyState === 1) {
//             return mongoose.connection;
//         }

//         const opts = {
//             connectTimeoutMS: 10000, // 10 seconds
//             socketTimeoutMS: 45000,  // 45 seconds
//             maxPoolSize: 10,
//             serverSelectionTimeoutMS: 10000, // 10 seconds
//         };

//         const uri = process.env.MONGODB_URI;
//         if (!uri) {
//             throw new Error('MONGODB_URI is not defined in environment variables');
//         }

//         console.log('Connecting to MongoDB...');
//         const conn = await mongoose.connect(uri, opts);
//         console.log('MongoDB connected successfully');
        
//         return conn;
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         throw error;
//     }
// }

export async function connectToMongoDB() {
  // If a cached connection exists, return it
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }

  // Close any existing connections first
  if (mongoose.connections[0].readyState) {
    await mongoose.disconnect();
  }

  try {
    // If no cached connection exists, establish a new connection to MongoDB
    const cnx = await mongoose.connect(process.env.MONGODB_URI!);
    // Cache the connection for future use
    cachedConnection = cnx.connection;
    // Log message indicating a new MongoDB connection is established
    console.log("New mongodb connection established");
    // Return the newly established connection
    return cachedConnection;
  } catch (error) {
    // If an error occurs during connection, log the error and throw it
    console.log(error);
    throw error;
  }
}

// Add a function to explicitly close the connection
export async function disconnectFromMongoDB() {
  if (cachedConnection) {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log("Disconnected from MongoDB");
  }
}