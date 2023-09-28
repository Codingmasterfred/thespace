'use strict';

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const connectToMongoDB = require('./middleware/db');
require('dotenv').config();




const app = express();
const port = 3000; // Replace with your desired port number

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

async function connectToMongoDB() {
    try {
      // Connecting to MongoDB
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas', error);
      throw error;
    }
  }
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
app.get('/items', (req, res) => {
  res.json(items);
});

// POST route to create a new item
app.post('/items', (req, res) => {
  const newItem = req.body; // Assuming the request body contains the item data
  items.push(newItem);
  res.status(201).json(newItem); // Respond with the created item
});

// PUT route to update an existing item
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItemData = req.body; // Assuming the request body contains the updated data

  // Find the item by ID and update it (replace this with your logic)
  const updatedItem = items.find(item => item.id === itemId);
  if (!updatedItem) {
    return res.status(404).json({ message: 'Item not found' });
  }

  // Update the item properties
  updatedItem.property1 = updatedItemData.property1;
  updatedItem.property2 = updatedItemData.property2;

  res.json(updatedItem);
});

// DELETE route to delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;

  // Find the index of the item by ID (replace this with your logic)
  const itemIndex = items.findIndex(item => item.id === itemId);
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  // Remove the item from the array
  items.splice(itemIndex, 1);

  res.json({ message: 'Item deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
