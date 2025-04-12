
import mongoose from "mongoose";

// here the user schema is defined

const userSchema = new mongoose.Schema({
    googleId:{type:String, required:true, unique:true},
    email :{type: String , required:true},
    name :{type: String , required:true},
},
{timestamps:true} // this will add createdAt and updatedAt fields to the schema

);

// here the user model is created   
const User = mongoose.model("User", userSchema);
// here the user model is exported          
export default User; // here the user model is exported