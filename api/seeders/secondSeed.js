//const mongoose = require('mongoose');
//const connectToMongoDB = require('../middleware/db');
//const LeadershipTalent = require('../models/leadershipTalentModel');
//const FreelanceTalent = require('../models/freelanceTalentModel');
//const JobListing = require('../models/jobListingsModel');
//const leadershipTalentSeed = require('./leadershipTalentSeed');
//const freelanceTalentSeed = require('./freelanceTalentSeed');
//const jobListingSeed = require('./jobListingsSeed');
//
//async function seedDatabase() {
//  try {
//    await connectToMongoDB(); // Connect to MongoDB
//
//    // Seed LeadershipTalent
//    for (const talentData of leadershipTalentSeed) {
//      const talent = new LeadershipTalent(talentData);
//      await talent.save();
//    }
//
//    console.log('Leadership talent seeded successfully.');
//
//    // Seed FreelanceTalent
//    for (const talentData of freelanceTalentSeed) {
//      const talent = new FreelanceTalent(talentData);
//      await talent.save();
//    }
//
//    console.log('Freelance talent seeded successfully.');
//
//    // Seed JobListing
//    for (const listingData of jobListingSeed) {
//      const listing = new JobListing(listingData);
//      await listing.save();
//    }
//
//    console.log('Job listings seeded successfully.');
//  } catch (error) {
//    console.error('Error seeding database:', error);
//  } finally {
//    // Close the MongoDB connection
//    mongoose.connection.close();
//  }
//}
//
//seedDatabase();