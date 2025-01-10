
import mongoose from "mongoose";
 
import {Schema} from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;


const userSchema = Schema({
  email : {type:String , unique :true},
  password : String,
  firstName : String,
  lastName : String
});

const adminSchema = Schema({
  email : {type:String},
  password : String,
  firstName : String,
  lastName : String
});

const courseSchema = Schema({
  title : String,
  description :String,
  price : Number,
  imageUrl : String,
  creatorId : ObjectId
});

const purchaseSchema = Schema({
  userId : ObjectId,
  courseId : ObjectId
});

const userModel = mongoose.model("Users",userSchema);
const adminModel = mongoose.model("Admins",adminSchema);
const courseModel = mongoose.model("Courses",courseSchema);
const purchaseModel = mongoose.model("Purchases",purchaseSchema);

export {userModel , adminModel ,courseModel , purchaseModel};