// Import bcryptjs for password comparison
const bcrypt=require('bcryptjs');
const User=require('../models/user');
// Import jsonwebtoken for creating a token upon successful registration.
const jwt=require('jsonwebtoken');

// A helper function to generate a JWT.
// It takes the user's ID as a payload.
const generateToken=(id)=>{
 // jwt.sign() creates a token.
 // The first argument is the payload (data to store in the token).
 // The second argument is the JWT_SECRET from our .env file. This secret is used to sign and verify tokens.
 // The third argument is an options object. 'expiresIn' sets the token's expiration time.
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    });
};

const registerUser=async(req,res)=>{
    try{
        //It extracts three properties (name, email, and password) from the req.body object and creates three separate constants with those values.
        const{name,email,password}=req.body;
       // Basic Validation: Check if all required fields were provided.
        if(!name||!email||!password){
            res.status(400);
            throw new Error('please add all fields');
        }
        //Check if the user already exists in the database.
        // We use the User model's findOne method to search for a user by their email.
        const userExist=await User.findOne({email});
        if(userExist){
            res.status(400);
            throw new Error('user already exists');
        }
         //  If the user doesn't exist, create a new user.
         // The User.create() method creates a new document and saves it to the database.
         // Our pre-save hook in the User model will automatically hash the password.
        const user=await User.create({
            name,
            email,
            password,
        });
         // If the user was created successfully, send a response.
        if(user){
            // We send a 201 Created status code.
            // The response includes the user's data (excluding the password) and a JWT.
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),// Generate a token for the new user
            });
        }else{
            res.status(400);
            throw new Error('invalid user data');
        }
    }catch(error){
        // If any error occurs in the try block, it's caught here.
       // We send back whatever status code was set (or default to 500) and the error message.
       res.status(res.statusCode||500).json({message:error.message});
    }
};

const loginUser=async(req,res)=>{
     try{
        const {email,password}=req.body;
        const user=await User.findOne({email}).select('+password');
        //The bcrypt.compare() function takes the plain text password as the first argument and the hashed password from the database as the second argument.
        // It hashes the first argument and compares it with the already-hashed second argument to verify they match.
        if(user && (await bcrypt.compare(password,user.password))){
            res.status(200).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                // We call our generateToken function, passing in the authenticated user's unique MongoDB ID.
               // This function returns a newly signed JWT.
                token:generateToken(user._id),
            });
        }else{
            res.status(401);
            throw new Error('invalid credentials');
        }
     }catch(error){
        res.status(res.statusCode||500).json({message:error.message});
     }
}
//Named exports( after ="{ }") are useful when you want to export multiple functions from the same file.
module.exports={registerUser,loginUser};