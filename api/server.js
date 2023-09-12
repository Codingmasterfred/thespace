require('dotenv').config();

// Requiring express after installing it
const express = require('express');

const bodyParser = require('body-parser');

//import database connection
const pool = require('./middleware/db')


//Invoking cors to protect use security on our routes
const cors = require('cors');

// Envoking the function
const app = express();

//Middleware
app.use(express.json());
app.use(bodyParser.json());
//app.use(getUserInfo);

//Importing authentication middleware
//const { getUserInfo } = require('./middleware/authentication');

//Defining routes
//const placeholderRoutes = require('./routes/placeholder');

//Middleware
app.use(cors());

// Routes
//app.use('/placeholder', placeholderRoutes)

//Using the next parameter lets us use different middleware,
//without it our middleware would get stuck at the first one.
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
//Test Route
app.get('/test', (req, res) => {
    res.send('This means that it works :)');
});
//Listen for request
app.listen(process.env.PORT, () =>{
    console.log(` 🔅 Listening on Port`, process.env.PORT);
});