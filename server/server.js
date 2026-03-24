import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import "dotenv/config";
import connectDB from './configs/db.js';
import { clerkMiddleware } from "@clerk/express";
import clerkwebhooks from "./controllers/clerkWebhooks.js";
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingsRouter from './routes/bookingsRoutes.js';
import { stripeWebhooks } from './controllers/stripeWebhooks.js';

dotenv.config();
connectDB();
connectCloudinary();

const app = express();
app.use(cors());

app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.use(express.json());
app.use(clerkMiddleware());

app.post("/api/clerk", clerkwebhooks);

app.get('/', (req, res) => res.send('API is working'));
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



export default app;