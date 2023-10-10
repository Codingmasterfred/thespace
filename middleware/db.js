const mongoose = require('mongoose');
require('dotenv').config();
// Connection URI stored in environment variable for security purposes
const uri = process.env.MONGODB_URI;
// Connect to MongoDB
async function connectToMongoDB() {
  try {
    // Connecting to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas', error);
    throw error;
  }
}
module.exports = connectToMongoDB;