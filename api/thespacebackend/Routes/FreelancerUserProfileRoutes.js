'use strict';

const express = require('express');
const mongoose = require('mongoose');
const FreelancerUserProfile = require('../models/freelancerUserProfileModel'); // Import your Mongoose model for freelancer user profiles

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

let freelancerUserProfileRouter = express.Router();

// GET: Get a list of all freelancer user profiles
freelancerUserProfileRouter.get('/', async (req, res) => {
  try {
    const freelancerUserProfiles = await FreelancerUserProfile.find();
    res.json(freelancerUserProfiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Get a specific freelancer user profile by ID
freelancerUserProfileRouter.get('/:id', getFreelancerUserProfile, (req, res) => {
  res.json(res.freelancerUserProfile);
});

// POST: Create a new freelancer user profile
freelancerUserProfileRouter.post('/', async (req, res) => {
  const freelancerUserProfile = new FreelancerUserProfile({
    // Add freelancer user profile properties as needed
    // Example:
    // username: req.body.username,
    // skills: req.body.skills,
    // ...
  });

  try {
    const newFreelancerUserProfile = await freelancerUserProfile.save();
    res.status(201).json(newFreelancerUserProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update a freelancer user profile by ID
freelancerUserProfileRouter.put('/:id', getFreelancerUserProfile, async (req, res) => {
  // Update freelancer user profile properties as needed

  try {
    const updatedFreelancerUserProfile = await res.freelancerUserProfile.save();
    res.json(updatedFreelancerUserProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete a freelancer user profile by ID
freelancerUserProfileRouter.delete('/:id', getFreelancerUserProfile, async (req, res) => {
  try {
    await res.freelancerUserProfile.remove();
    res.json({ message: 'Freelancer user profile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a freelancer user profile by ID
async function getFreelancerUserProfile(req, res, next) {
  let freelancerUserProfile;
  try {
    freelancerUserProfile = await FreelancerUserProfile.findById(req.params.id);
    if (freelancerUserProfile == null) {
      return res.status(404).json({ message: 'Freelancer user profile not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.freelancerUserProfile = freelancerUserProfile;
  next();
}

module.exports = freelancerUserProfileRouter;
