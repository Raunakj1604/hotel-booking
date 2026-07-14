import User from "../models/user.js";
import {Webhook} from "svix";

const clerkWebHooks = async (req, res) => {
  try{
    //create a Svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
    
    //getting headers
    const headers = {
        "svix-id" : req.headers["svix-id"],
        "svix-timestamp" : req.headers["svix-timestamp"],
        "svix-signature" : req.headers["svix-signature"]
    }
    // verify headers
    await whook.verify(JSON.stringify(req.body), headers)    


    //getting data from the request body
    const {data, type} = req.body

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image : data.image_url,
    }


    //Switch case for different Events
    switch(type){
        case "user.created":{
          await User.create(userData)
          res.status(200).json({message : "User Created"})
          break;
        }
        case "user.updated":{
          await User.findByIdAndUpdate( data.id , userData, {new: true})
          res.status(200).json({message : "User Updated"})
          break;
        }
        case "user.deleted":{
          await User.findByIdAndDelete(data.id)
          res.status(200).json({message : "User Deleted"})
          break;
        }
        default :
        break;
    }
  }
  catch (error) {
    console.log(error.message)
    res.status(500).json({success: false, message : error.message})
  }
} 

export default clerkWebHooks;