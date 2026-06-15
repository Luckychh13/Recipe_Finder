// Import the Mongoose library, which is our Object Data Modeling (ODM) tool for MongoDB.
const mongoose=require('mongoose');
//import color package
const colors=require('colors');
// Define an asynchronous function to connect to the database.
const connectDB=async()=>{
    try{
        // Attempt to connect to the MongoDB database using the connection string (URI)
        // stored in our environment variables. Mongoose.connect() returns a promise.
        //process.env.MONGO_URI retrieves the connection string you carefully prepared and stored in your .env file.
        //  The dotenv package (which we'll call in server.js) makes this variable available.
        const conn=await mongoose.connect(process.env.MONGO_URI);
        // We use the 'conn' object to access details about the connection, like the host name.
        console.log(`mongoDB connected:${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.error(`error: ${error.message}`.red.bold);
            // Exit the Node.js process with a "failure" code (1).
           // This is crucial because if the app can't connect to its database,
           // it's fundamentally broken and should not continue to run.
        process.exit(1);
    }
};

module.exports=connectDB;
