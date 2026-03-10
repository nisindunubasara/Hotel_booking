import express from "express";
import {
   checkAvailabilityAPI,
   createBooking,
   getUserBookings,
   getHotelBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingsRouter = express.Router();

bookingsRouter.post("/check-availability", checkAvailabilityAPI);
bookingsRouter.post("/book", protect, createBooking);
bookingsRouter.get("/user", protect, getUserBookings);
bookingsRouter.get("/hotel", protect, getHotelBookings);

export default bookingsRouter;
