import {Router} from 'express';
import { adminModel, userModel ,courseModel, purchaseModel } from "../db.js";
import { userMiddleware } from '../middleware/userm.js';

const courseRouter = Router();


  
  courseRouter.post('/purchase',userMiddleware,async (req,res)=>{
      //buying course
      const userId = req.userId;
      const courseId = req.body.courseId;

      await purchaseModel.create({
        userId,
        courseId
      })

      res.json({
        message : "successfully purchased"
      })
  })


  courseRouter.get('/preview',userMiddleware, async (req,res)=>{
    //show all courses

    const allCourses = await courseModel.find({});

    res.json({
      "message" : "all course",
      allCourses
    })
  })


  courseRouter.get('/previewMy',userMiddleware,async (req,res)=>{
    //show my courses
    const userId = req.userId;
    const purchasedCourses = await purchaseModel.find({
      userId : userId
    });

    const courseData = await courseModel.find({
      _id : {$in : purchasedCourses.map(x => x.courseId)}
    })

    res.json({
      "message" : "my course",
      purchasedCourses :courseData
    })
  })
  

export { courseRouter };

