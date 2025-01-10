import {Router} from "express";
import { adminModel, userModel } from "../db.js";
import jwt from 'jsonwebtoken';
const adminRouter = Router();
import bcrypt from 'bcrypt';
import {adminMiddleware} from "../middleware/adminm.js"
import express from 'express';
const app = express();

import {JWT_ADMIN_SECRET} from '../config.js';
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

adminRouter.post("/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(403).json({ message: "incorrect credential" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (isPasswordValid) {
      const token = jwt.sign({ id: admin._id }, JWT_ADMIN_SECRET);

      res.json({
        token: token,
        message: "Login successful"
      });
    } else {
      res.status(403).json({
        message: "incorrect credential"
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred during signin",
      error: error.message
    });
  }
});

//adding new course
adminRouter.post("/course",adminMiddleware ,async (req,res)=>{
    const adminId = req.userId;
    const {title , description , imageUrl , price} = req.body;

    const course = await courseModel.create({
        title : title,
        description: description ,
        imageUrl : imageUrl,
        price :price,
        creatorId : adminId
    });

    res.json({
      message : "Course created ",
      courseId : course._id
    });

})

//updating any course


adminRouter.put("/course",adminMiddleware ,async (req,res)=>{
  const adminId = req.userId;
  const {title , description , imageUrl , price} = req.body;

  const course = await courseModel.create({
      title : title,
      description: description ,
      imageUrl : imageUrl,
      price :price,
      creatorId : adminId
  });

  res.json({
    message : "Course created ",
    courseId : course._id
  });

})




export {adminRouter};