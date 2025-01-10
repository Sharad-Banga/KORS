import jwt from 'jsonwebtoken';

import JWT_USER_SECRET from '../config.js';



function userMiddleware(req , res ,next){
   const token = req.headers.token;
   const decoded = JsonWebTokenError.verify(token,JWT_USER_SECRET);

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

export { userMiddleware };