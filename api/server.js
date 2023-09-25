require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// parse json requests 
app.use(express.json());

app.use(cors());


// Routes

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