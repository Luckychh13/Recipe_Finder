// This line loads the environment variables from the .env file
// It's crucial to place this at the very top so that all other files/modules
// in your application, like our db.js, have access to process.env.
const dotenv=require('dotenv');
const userRoutes = require('./routes/userRoutes');
const favoriteRoutes = require('./routes/favoritesRoutes');
//import the cors middleware
const cors=require('cors');
const connectDB=require('./config/db');
const express=require('express');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
dotenv.config();
//----DATABASE CONNECTION---
connectDB();
const app=express();
// --- MIDDLEWARE ---
// NEW: Enable CORS for all routes. This allows our future React frontend
// to make requests to our Express backend.
// This must be placed before the routes are defined.
app.use(cors());
// This middleware is built into Express and is needed to parse
// incoming request bodies with JSON payloads (e.g., from req.body).
app.use(express.json());
// Define a port for the server to listen on
app.get('/',(req,res)=>{
    res.send('API is running.....')
});

//----ROUTES-----
// Mount the user routes. Any request to /api/users will be handled by the userRouter
app.use('/api/users',userRoutes);
app.use('/api/favorites',favoriteRoutes);
// Custom error handling middleware (should be last)
app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT||5000;
//This function starts a UNIX socket and listens for connections on the given path. In simpler terms, 
// it turns on our server and tells it to pay attention to network activity on PORT 5000.
app.listen(PORT,()=>{
    console.log(`server is up and running on port ${PORT}`);
});