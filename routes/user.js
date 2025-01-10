import { Router } from 'express';
const userRouter = Router();
import express from 'express';
const app = express();
import bcrypt from 'bcrypt';
import { userModel } from '../db.js'; 

import {JWT_USER_SECRET} from '../config.js';
app.use(express.json());

import jwt from "jsonwebtoken";



  userRouter.post('/signup' , async (req,res)=>{
    const {email} = req.body;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    

    try{
      const hashedPassword = await bcrypt.hash(password,8);
      await userModel.create({
        email: email,
        password : hashedPassword,
        firstName : firstName,
        lastName : lastName
        
      });

      res.json({
        message :"signup succedded"
      })
    }
    catch(e){
        console.log(
          "try catch in user signup : email must be unique"
        );
        
    }

    

  })

  userRouter.post('/signin' ,async (req,res)=>{

    const {email , password} = req.body;


    const user = await userModel.findOne({
      email : email
    });

    if(!user){
      res.status(403).json({
        message : "incorrect credential"
      })
    }

    
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if(isPasswordValid){
        const token = jwt.sign({id:user._id},JWT_USER_SECRET);

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
    
   
  })

  userRouter.get('/purchases' , (req,res)=>{
    //my courses
  })


export {userRouter};