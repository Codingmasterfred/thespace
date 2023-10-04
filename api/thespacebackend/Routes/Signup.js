//Load enviornment variables from .env file
require('dotenv').config();

// Import the MongoDB middleware
const connectToMongoDB = require('./middleware/db');
//const seedDatabase = require("./seeders/seed");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// parse json requests 
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({   //Creating a set of instructions that tells a program how to save files when they are uploaded
    destination: function (req, file, cb) {  // Define the destination folder for storing uploaded files.
        cb(null, 'uploads');  // 'uploads' is the folder where files will be saved.
    },
    filename:function(req, file, cb) {  // Define the filename for the uploaded file
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename using the current timestamp and the original filename
    },
});

// Create a Multer middleware instance called 'upload' with the specified 'storage' configuration.
const upload = multer({storage});

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

// Routes

//Test Route
app.get('/test', (req, res) => {
    res.send('This means that it works :)');
});

// Define a route to handle user registration while extracting user registration data from the body. 
app.post('/auth/register', upload.single('picture'), (req, res) => {
    try {
        const {firstName, lastName, email, password, location, occupation} = req.body;

// Respond with a success message if registration succeeds and a error message handler if registration fails.
        res.json({success: true, message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Registration failed'});
    }
});

// Define a route to handle user login while extracting user login data. Respond with a success message with a successful login and respond with a 401 message if login fails.
app.post('/auth/login', (req, res) => {
    try {
        const {email, password} = req.body;
        res.json({
            success:true,
            user:{/*user data here*/},
            token: 'your_access_token',
        });
    } catch (error) {
        res.status(401).json({success: false, message: 'Login failed'});
    }
});

//Listen for request
app.listen(process.env.PORT, async () =>{
    console.log(` 🔅 Listening on Port`, process.env.PORT);
    //await connectToMongoDB();
    //await seedDatabase();
});