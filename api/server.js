//Load enviornment variables from .env file
require("dotenv").config();

// Import the MongoDB middleware
 const connectToMongoDB = require("./middleware/db");
//const seedDatabase = require("./seeders/seed");
const express = require("express");
const cors = require("cors");
const Jobs = require("./models/jobListingsModel");
const mongoose = require("mongoose");
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

//---------Daron was here working on routes----------
// Post route for the job listings

app.post("/joblistings", async (req, res) => {

  // Establishing a connection with MongoDb
  // await connection();

  let job = req.body;

  await Jobs.insertMany(job).then(() => {
    console.log("Job listing has been added.");
  });



  res.send(job);
});

app.get("/joblistings", async (req, res) => {
  const Listings = await Jobs.find()
  res.send(Listings)
});

app.put("/joblistings", async (req, res) => {

  try{

    const jobID = req.body._id

    const updatedJob = await Jobs.findByIdAndUpdate(
      jobID,
      req.body,
      {new: true}
    );

    if(!updatedJob){
      return res.status(404).json({ message: "Job listing not found"});
    }

    res.json(updatedJob);


  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server error"})
  }

})

app.delete("/joblistings", async (req, res) => {
  
})
//<------------The end of Daron making routes------------------>


//Listen for request
app.listen(process.env.PORT, async () => {
  console.log(` 🔅 Listening on Port`, process.env.PORT);
  //await connectToMongoDB();
  //await seedDatabase();
});
