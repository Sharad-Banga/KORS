import jwt from 'jsonwebtoken';

import {JWT_USER_SECRET} from '../config.js';



function userMiddleware(req , res ,next){
   const token = req.headers.token;
   try{
    const decoded = jwt.verify(token,JWT_USER_SECRET);
    console.log(decoded);
    
    if(decoded){
      req.userId = decoded.id;
      next();
     }
     else{
        res.json({
          message :" +++++++++++++++++you are not signed in"
        });
     }
   }
   catch(e){
    res.json({
      message : "not veriy",
      decoded :decoded
    })
   }

   
}

export { userMiddleware };