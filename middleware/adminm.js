
import jwt from 'jsonwebtoken';

import {JWT_ADMIN_SECRET} from '../config.js';



function adminMiddleware(req , res ,next){
   const token = req.headers.token;
   const decoded = jwt.verify(token,JWT_ADMIN_SECRET);

   if(decoded){
    req.userId = decoded.id;
    next();
   }
   else{
      res.json({
        message :"you are not signed in"
      });
   }
}

export { adminMiddleware };