const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');

//connection URI stored in environment variable for security purposes
const uri = "mongodb+srv://DemoUser:spacinouT@thespacedemo.8hz6xoa.mongodb.net/thespace";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

//connect to MongoDB and return the client
async function connectToMongoDB() {
    try {
        //Connecting client to MongoDB server
        await mongoose.connect(uri);
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client;
    } catch (error) {
        console.error('Error connecto to MongoDB Atlas', error);
        throw error;
    }
}

module.exports = connectToMongoDB;