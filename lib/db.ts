import mongoose from 'mongoose';

const URI =
  'mongodb+srv://deulo:deulo9500@blogtuts.y0vlzzj.mongodb.net/?retryWrites=true&w=majority&appName=blogtuts';

if (!URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

/** Ensure Mongoose uses a single connection in development */
let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    const connection = await mongoose.connect(URI);

    isConnected = !!connection.connections[0].readyState;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Could not connect to MongoDB');
  }
}
