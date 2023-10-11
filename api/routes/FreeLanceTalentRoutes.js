//Load environment variables from .env file
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

// <==================Daron Was Here====================>
//  <================Freelance Routes==================>

app.post("/freelancetalent", async (req, res) => {

    // Establishing a connection with MongoDb
    // await connection();
  
    let Talent = req.body;
  
    await Freelance.insertMany(Talent).then(() => {
      console.log("Freelance Talent has been added.");
    });
  
  
  
    res.send(Talent);
  });
  
  app.get("/freelancetalent", async (req, res) => {
    const Talent = await Freelance.find()
    res.send(Talent)
  });
  
  app.put("/freelancetalent", async (req, res) => {
  
    try{
  
      const talentID = req.body._id
  
      const updatedTalent = await Freelance.findByIdAndUpdate(
        talentID,
        req.body,
        {new: true}
      );
  
      if(!updatedTalent){
        return res.status(404).json({ message: "Freelance Talent not found"});
      }
  
      res.json(updatedTalent);
  
  
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server error"})
    }
  
  })
  
  app.delete("/freelancetalent", async (req, res) => {
  
    const talentID = req.body._id
  
    const deletedTalent = await Jobs.findByIdAndDelete(talentID)
    res.send(deletedTalent)
  })
  //<------------Daron has completed making Freelance routes------------------>