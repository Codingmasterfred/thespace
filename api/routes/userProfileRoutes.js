'use strict'

const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const UserProfile = require('../models/userProfileModel'); // Import your Mongoose model

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

let userProfileRouter = express.Router()

// GET: Get a list of all user profiles
userProfileRouter.get('/', async (req, res) => {
  try {
    const userProfiles = await UserProfile.find();
    res.json(userProfiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Get a specific user profile by ID
userProfileRouter.get('/:id', getUserProfile, (req, res) => {
  res.json(res.userProfile);
});

// POST: Create a new user profile
userProfileRouter.post('/', async (req, res) => {
  const userProfile = new UserProfile({
    username: req.body.username,
    // Add other user profile properties as needed
  });

  try {
    const newUserProfile = await userProfile.save();
    res.status(201).json(newUserProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update a user profile by ID
userProfileRouter.put('/:id', getUserProfile, async (req, res) => {
  if (req.body.username != null) {
    res.userProfile.username = req.body.username;
  }
  // Update other user profile properties as needed

  try {
    const updatedUserProfile = await res.userProfile.save();
    res.json(updatedUserProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete a user profile by ID
userProfileRouter.delete('/:id', getUserProfile, async (req, res) => {
  try {
    await res.userProfile.remove();
    res.json({ message: 'User profile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a user profile by ID
async function getUserProfile(req, res, next) {
  let userProfile;
  try {
    userProfile = await UserProfile.findById(req.params.id);
    if (userProfile == null) {
      return res.status(404).json({ message: 'User profile not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.userProfile = userProfile;
  next();
}


module.exports = userProfileRouter; // Use module.exports instead of export default
