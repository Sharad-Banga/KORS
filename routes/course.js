import {Router} from 'express';

const courseRouter = Router();

  courseRouter.get('/preview', (req,res)=>{
    //show all courses
    res.json({
      "message" : "purchce course"
    })
  })
  
  courseRouter.post('/purchase', (req,res)=>{
      //buying course
      res.json({
        "message" : "purchce course"
      })
  })
  

export { courseRouter };