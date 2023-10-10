//Load enviornment variables from .env file
require("dotenv").config();

// Import the MongoDB middleware
 const connectToMongoDB = require("./middleware/db");
//const seedDatabase = require("./seeders/seed");
const express = require("express");
const cors = require("cors");
const Jobs = require("./models/jobListingsModel");
const Freelance = require("./models/freelanceTalentModel");
const mongoose = require("mongoose");
const FreelanceTalent = require("./models/freelanceTalentModel");
const app = express();

// parse json requests
app.use(express.json());

app.use(cors());

// Middleware to connect to MongoDB
//Using the next parameter lets us use different middleware,
//without it our middleware would get stuck at the first one.

app.use(async (req, res, next) => {
  try {
    req.mongoClient = await connectToMongoDB();
    console.log();
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Routes

//Test Route
app.get("/test", (req, res) => {
  res.send("This means that it works :)");
});


//Listen for request
app.listen(process.env.PORT, async () => {
  console.log(` 🔅 Listening on Port`, process.env.PORT);
  //await connectToMongoDB();
  //await seedDatabase();
});
