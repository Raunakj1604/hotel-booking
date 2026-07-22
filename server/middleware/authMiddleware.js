import User from "../models/user.js";
import { getAuth } from "@clerk/express";

//middleware to check if the user is authenticated

export const protect = async(req,res,next) =>{
   const { userId } = getAuth(req);
   
  // const {userId} = req.auth;
  if(!userId){
    res.json({success : false, message : "not authenticated"})
  }
  else{
    const user = await User.findById(userId);
    req.user = user;
    next();
  }
}