// //Load enviornment variables from .env file
// require("dotenv").config();

// // Import the MongoDB middleware
//  const connectToMongoDB = require("./middleware/db");
// //const seedDatabase = require("./seeders/seed");
// const express = require("express");
// const cors = require("cors");
// const Jobs = require("./models/jobListingsModel");
// const Freelance = require("./models/freelanceTalentModel");
// const mongoose = require("mongoose");
// const FreelanceTalent = require("./models/freelanceTalentModel");
// const app = express();

// // parse json requests
// app.use(express.json());

// app.use(cors());

// //---------Daron was Here----------
// // Post route for the job listings

// app.post("/joblistings", async (req, res) => {

//     // Establishing a connection with MongoDb
//     // await connection();
  
//     let job = req.body;
  
//     await Jobs.insertMany(job).then(() => {
//       console.log("Job listing has been added.");
//     });
  
  
  
//     res.send(job);
//   });
  
//   app.get("/joblistings", async (req, res) => {
//     const Listings = await Jobs.find()
//     res.send(Listings)
//   });
  
//   app.put("/joblistings", async (req, res) => {
  
//     try{
  
//       const jobID = req.body._id
  
//       const updatedJob = await Jobs.findByIdAndUpdate(
//         jobID,
//         req.body,
//         {new: true}
//       );
  
//       if(!updatedJob){
//         return res.status(404).json({ message: "Job listing not found"});
//       }
  
//       res.json(updatedJob);
  
  
//     } catch (error) {
//       console.log(error)
//       res.status(500).json({ message: "Internal Server error"})
//     }
  
//   })
  
//   app.delete("/joblistings", async (req, res) => {
  
//     const jobID = req.body._id
  
//     const deletedJob = await Jobs.findByIdAndDelete(jobID)
//     res.send(deletedJob)
//   })

//   //==============Daron has completed making joblisting routes===================