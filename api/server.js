require('dotenv').config();

// Requiring express after installing it
const express = require('express');
// Envoking the function
const app = express();
//Invoking cors to protect use security on our routes
const cors = require('cors');
//Importing the routes we have
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/userpost');

//Importing authentication middleware
//const { getUserInfo } = require('./middleware/authentication');

//Middleware
app.use(express.json());
app.use(cors());
//app.use(getUserInfo);

// Setting up the Routes
app.use('/post', postRoutes)
app.use('/user', userRoutes)
app.use('/profile', profileRoutes)

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