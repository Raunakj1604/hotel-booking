import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.js";
import streamifier from "streamifier";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// controller to create a room
export const createRoom = async (req, res) => {
  try {
    const { roomtype, pricepernight, amenities } = req.body;
    console.log("req.body =", req.body);
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) return res.json({ success: false, message: "no hotel found" });
    // Upload images to Cloudinary
    const uploadImages = req.files.map(async (file) => {
      console.log("Controller hit");
      console.log("FILE =", file);

      const response = await uploadToCloudinary(file.buffer, "hotel-images");

      return response.secure_url;
    });

    // Wait for all uploads to complete
    const images = await Promise.all(uploadImages);

    console.log(images);

    // Create the room
    await Room.create({
      hotel: hotel._id,
      roomtype,
      pricepernight: +pricepernight,
      amenities: JSON.parse(amenities),
      images,
    });
    res.json({
      success: true,
      message: "Room created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isavailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.user._id });

    const rooms = await Room.find({
      hotel: hotelData._id.toString(),
    }).populate("hotel");

    res.json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const {roomId} = req.body;
    const roomData =  await Room.findById(roomId);
    roomData.isavailable = !roomData.isavailable;
    await roomData.save()
    res.json({success : true, message: "room availability updated"})
  } catch (error) {
    res.json({success : false, message : error.message})
  }
};
