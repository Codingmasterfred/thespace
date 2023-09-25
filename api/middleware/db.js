const { MongoClient, ServerApiVersion } = require('mongodb');

//connection URI stored in environment variable for security purposes
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

//connect to MongoDB and return the client
async function connectToMongoDB() {
    try {
        //Connecting client to MongoDB server
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client;
    } catch (error) {
        console.error('Error connecto to MongoDB Atlas', error);
        throw error;
    }
}

module.exports = connectToMongoDB;