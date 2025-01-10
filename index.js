
import express from 'express';
const app = express();

import mongoose from "mongoose";

import { userRouter } from './routes/user.js';
import {courseRouter} from './routes/course.js';
import { adminRouter } from './routes/admin.js';

app.use(express.json());

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);




async function main(){
  await mongoose.connect("mongodb+srv://sharad_banga:sharad@cluster0.8vv4o.mongodb.net/KORS");
  mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
  });
  
  app.listen(3000);
  console.log("chal rhi hai");
  

}
main();
         