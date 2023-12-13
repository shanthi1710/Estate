import { errorHandler } from "./error.js";
import Jwt  from "jsonwebtoken";
export const verifyToken=(req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(404,'Unauthorized'));
    }
    Jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,'forbidden'));
        req.user=user;
        next();
    });
};