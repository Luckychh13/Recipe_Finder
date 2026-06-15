//It is used to:
//create tokens when a user logs in
//verify tokens when a user makes a protected request
const jwt=require('jsonwebtoken');
/*asyncHandler: We wrap our entire async function in express-async-handler. This is a handy utility that automatically catches any errors thrown within the async function
(like our throw new Error(...) lines) and passes them on to your Express error handling middleware, so you don't need to write repetitive try...catch blocks for everything. */
const asyncHandler=require('express-async-handler');
const User=require('../models/user');
//middleware function called protect.
const protect=asyncHandler(async(req,res,next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            token=req.headers.authorization.split(' ')[1];
           
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            //This fetches the user document from the database (MongoDB)
            //“Give me all user fields except the password”
            req.user=await User.findById(decoded.id).select('-password');

            next();
        }catch(error){
            console.error('Token verification failed:',error);
            res.status(401);
            throw new Error('Not authorized,token failed');
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized,no token');
    }
});

module.exports={protect};