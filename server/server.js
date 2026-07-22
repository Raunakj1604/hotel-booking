import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";


dotenv.config();
connectDB();
connectCloudinary();
const app = express();

app.use(cors())

//middleware
app.use(express.json())
app.use(clerkMiddleware());

app.use("/api/clerk",clerkWebHooks)

app.get("/", (req,res)=>res.send("API is working fantastically"))
app.use("/api/user", userRouter)
app.use("/api/hotels", hotelRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/bookings", bookingRouter)



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`server is listening at PORT ${PORT}`))