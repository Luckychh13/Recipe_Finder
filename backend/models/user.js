const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

// Define the schema for the User model.
// A schema is a blueprint that defines the structure and properties of a document.
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'please add a name'],
        },
        email:{
            type:String,
            required:[true,'please add an email'],
            unique:true,
             match: [
               /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
               'Please provide a valid email',
            ],
        },
        password:{
            type:String,
            required:[true,'Please add a password'],
            minlength:6,
            select:false, // Ensures that the password field is not returned by default in queries.
        },
        favorites:[
            {
                recipeId:{
            type:[String],
            default:[],
        },
        notes:{
            type:String,
            default:'',
        },
    },
],
    },
    {
        // The second argument to the Schema constructor is an 'options' object.
       // 'timestamps: true' tells Mongoose to automatically add two fields to each document:
      // - createdAt: A timestamp representing when the document was created.
      // - updatedAt: A timestamp representing when the document was last updated.
      // This is incredibly useful for auditing and tracking changes.
        timestamps:true,
    }
);

// Mongoose 'pre' middleware: A function that runs before a specified action, in this case, 'save'.
// We use a traditional function declaration here, not an arrow function, because we need access
// to the document being saved via the 'this' keyword. Arrow functions do not have their own 'this' context.
userSchema.pre('save',async function(){
     // We only want to hash the password if it has been modified or is new.
     // The 'isModified' method is a built-in Mongoose helper that checks if a given path
     // has been modified. This prevents us from re-hashing an already-hashed password
     // every time a user updates their profile (e.g., changing their name or email).
     //if (!this.isModified('password')): This is a crucial optimization. Imagine a user is already 
     // registered and just wants to change their name. When we save the updated user document, this hook will still run. Without this check,
     //  we would re-hash their already-hashed password, locking them out of their account. This line ensures our hashing logic only executes if the password field is being created for the first time or has been explicitly changed.
    if(!this.isModified('password')){
         // If the password field is not modified, return to proceed to the next
         // piece of middleware or the final save operation.
        return ;
    }
    // Generate a 'salt' to add randomness to the hash.
     // The number (10) is the 'cost factor' or 'salt rounds'. It determines how
     // computationally expensive the hashing will be. A higher number is more secure
     // but will take more time. 10 is a strong, standard default.
     // bcrypt.genSalt is an asynchronous operation, so we use 'await'.
    const salt=await bcrypt.genSalt(10);
     // Hash the plain-text password from the document ('this.password') using the generated salt.
     // This is also an asynchronous operation.
     // We then overwrite the plain-text password on the document with this new, secure hash.
    this.password=await bcrypt.hash(this.password,salt);
    
});
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
// Export the Mongoose model.
// mongoose.model() compiles the schema into a model.
// The first argument is the singular name of the model, 'User'.
// Mongoose will automatically look for the plural, lowercased version of your model name for the collection.
// Thus, the 'User' model will be for the 'users' collection in the database.
// This exported model can now be used in other parts of our application (like our route controllers) to interact with the 'users' collection.
const User=mongoose.model('User',userSchema);
module.exports=User;