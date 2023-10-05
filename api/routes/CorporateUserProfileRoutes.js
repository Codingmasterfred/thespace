'use strict';

const express = require('express');
const mongoose = require('mongoose');
const CorporateUserProfile = require('../models/corporateUserProfileModel'); // Import your Mongoose model for corporate user profiles

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

let corporateUserProfileRouter = express.Router();

// GET: Get a list of all corporate user profiles
corporateUserProfileRouter.get('/', async (req, res) => {
  try {
    const corporateUserProfiles = await CorporateUserProfile.find();
    res.json(corporateUserProfiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Get a specific corporate user profile by ID
// GET: Search for corporate user profiles based on criteria
corporateUserProfileRouter.get('/search', async (req, res) => {
  try {
    // Assuming you want to search by companyName, you can retrieve the search query from the request query parameters
    const { companyName } = req.query;

    // Define your search criteria based on the query parameters
    const searchCriteria = {};

    if (companyName) {
      searchCriteria.companyName = { $regex: new RegExp(companyName, 'i') }; // Case-insensitive search
    }

    // Perform the search using Mongoose's find method
    const searchResults = await CorporateUserProfile.find(searchCriteria);

    res.json(searchResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new corporate user profile
corporateUserProfileRouter.post('/', async (req, res) => {
  const corporateUserProfile = new CorporateUserProfile({
    // Add corporate user profile properties as needed
    companyName: req.body.companyName,
    // Other properties...
  });

  try {
    const newCorporateUserProfile = await corporateUserProfile.save();
    res.status(201).json(newCorporateUserProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update a corporate user profile by ID
corporateUserProfileRouter.put('/:id', getCorporateUserProfile, async (req, res) => {
  if (req.body.companyName != null) {
    res.corporateUserProfile.companyName = req.body.companyName;
  }
  // Update other corporate user profile properties as needed

  try {
    const updatedCorporateUserProfile = await res.corporateUserProfile.save();
    res.json(updatedCorporateUserProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete a corporate user profile by ID
corporateUserProfileRouter.delete('/:id', getCorporateUserProfile, async (req, res) => {
  try {
    await res.corporateUserProfile.remove();
    res.json({ message: 'Corporate user profile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a corporate user profile by ID
async function getCorporateUserProfile(req, res, next) {
  let corporateUserProfile;
  try {
    corporateUserProfile = await CorporateUserProfile.findById(req.params.id);
    if (corporateUserProfile == null) {
      return res.status(404).json({ message: 'Corporate user profile not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.corporateUserProfile = corporateUserProfile;
  next();
}

module.exports = corporateUserProfileRouter;
