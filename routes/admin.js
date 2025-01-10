
import {Router} from "express";
import { adminModel, userModel } from "../db.js";
import jwt from 'jsonwebtoken';
const adminRouter = Router();
import bcrypt from 'bcrypt';

import express from 'express';
const app = express();
const JWT_ADMIN_SECRET = "banga12345";

app.use(express.json());


adminRouter.post("/signup",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ "message": "All fields are required" });
    }
    

    try{
      const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
      const hashedPassword =await bcrypt.hash(password,8);

        await adminModel.create({
          email:email,
          password : hashedPassword,
          firstName :firstName,
          lastName :lastName

        });

        res.json({
          "message" : "admin signed up"
        })
    }
    catch(e){
      console.error(e.message);
      res.status(500).json({ "message" : "admin not signed up", "error": e.message });
    }
    

})

adminRouter.post("/signin",async (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;

  

  const admin = await adminModel.findOne({
    email : email
  })

  if(!admin){
    res.json("email not found ji")
  }
  else{

    const isPassword = await bcrypt.compare(password , admin.password);

    if(isPassword){
        const token = jwt.sign({id:user._id},JWT_ADMIN_SECRET);
        
        res.json({
            token : token ,
            message: "Login successful"
        })
    }
    else{
      res.json({
        message: "not found"
      })
    }

  }
  


})


adminRouter.post("/course",(req,res)=>{
  res.json({
    message : "admin course endpoint"
  })
})









export {adminRouter};