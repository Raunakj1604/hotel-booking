import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
hotel :{
type : String,
required : true,
ref : "Hotel"
},
roomtype :{
type : String,
required : true
},
pricepernight :{
type : Number,
required : true
},
amenities : {
  type : [String],
  required : true
},
images : [
  {type : String}
],
isavailable :{
  type : Boolean,
  default : true
}
},{
  timestamps : true
})

const Room = mongoose.model("Room",RoomSchema);

export default Room;