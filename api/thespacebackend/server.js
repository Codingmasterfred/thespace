//Load enviornment variables from .env file
require('dotenv').config();

// Import the MongoDB middleware
const connectToMongoDB = require('../middleware/db');
//const seedDatabase = require("./seeders/seed");
const express = require('express');
const cors = require('cors');
const app = express();
const userProfileRoutes = require('../routes/userProfileRoutes');
// parse json requests 
app.use(express.json());

app.use(cors());
app.use('/user-profiles', userProfileRoutes);


//Middleware to connect to MongoDB
//Using the next parameter lets us use different middleware,
//without it our middleware would get stuck at the first one.
app.use(async (req, res, next) => {
    try {
      req.mongoClient = await connectToMongoDB();
      console.log()
      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Routes

//Test Route
app.get('/test', (req, res) => {
    res.send('This means that it works :)');
});

// Middleware to connect to MongoDB
//Using the next parameter lets us use different middleware,
//without it our middleware would get stuck at the first one.
app.use(async (req, res, next) => {
  try {
    req.mongoClient = await connectToMongoDB();
    console.log()
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route to fetch all items
app.get('/user', (req, res) => {
const user = {
        id: 1,
        username: '',
        email: '',
        // Add more properties as needed
      };
  res.json(user);
});

// POST route to create a new item
app.post('/user', (req, res) => {
const newUser = req.body; // Assuming the request body contains the item data
users.push(newUser);
res.status(201).json(newUser); // Respond with the created item
});

// PUT route to update an existing item
app.put('/user/:id', (req, res) => {
const userId = req.params.id;
const updatedUserData = req.body; // Assuming the request body contains the updated data

// Find the item by ID and update it (replace this with your logic)
const updatedUserProfile = user.find(user => user.id === userId);
if (!updatedUserProfile) {
  return res.status(404).json({ message: 'User not found' });
}

// Update the item properties
updatedUserProfile.property1 = updatedUserData.property1;
updatedUserProfile.property2 = updatedUserData.property2;

res.json(updatedUserProfile);
});

// DELETE route to delete an item by ID
app.delete('/user/:id', (req, res) => {
const userId = req.params.id;

// Find the index of the item by ID (replace this with your logic)
const userIndex = user.findIndex(user => user.id === userId);
if (userIndex === -1) {
  return res.status(404).json({ message: 'User not found' });
}

// Remove the item from the array
user.splice(userIndex, 1);

res.json({ message: 'User deleted' });
});
//Listen for request
app.listen(process.env.PORT, async () =>{
    console.log(` 🔅 Listening on Port`, process.env.PORT);
    await connectToMongoDB();
    //await seedDatabase();
});
