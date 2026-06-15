const express=require('express');
const router=express.Router();

// Import the registerUser function from our controller
const {registerUser,loginUser}=require('../controllers/userController');

// Define the POST route for registration.
// When a POST request is made to '/register', the registerUser controller function will be executed.
router.post('/register',registerUser);
//same as the register one
router.post('/login',loginUser);








module.exports=router;