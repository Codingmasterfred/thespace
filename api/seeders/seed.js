const mongoose = require('mongoose');
const connectToMongoDB = require('../middleware/db'); //import db connection*/
const userProfilesSeed = require('./userProfileSeed'); // import seed file
const UserProfile = require('../models/userProfileModel'); // import Mongoose model

async function seedDatabase() {
    try {  
      await connectToMongoDB(); // Using middleware to connect to MongoDB
      // loop through the seed data and insert into the database
      for (const userProfileData of userProfilesSeed) {
        const userProfile = new UserProfile(userProfileData);
        await userProfile.save();
      }
  
      console.log('Database seeded successfully.');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      mongoose.connection.close(); // Close the MongoDB connection
    }
  }

  seedDatabase();
//module.exports = seedDatabase