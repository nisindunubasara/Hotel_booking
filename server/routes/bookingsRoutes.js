import express from "express";
import {
   checkAvailabilityAPI,
   createBooking,
   getUserBookings,
   getHotelBookings,
   stripePayment,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingsRouter = express.Router();

bookingsRouter.post("/check-availability", checkAvailabilityAPI);
bookingsRouter.post("/book", protect, createBooking);
bookingsRouter.get("/user", protect, getUserBookings);
bookingsRouter.get("/hotel", protect, getHotelBookings);
bookingsRouter.post("/stripe-payment", protect, stripePayment);

export default bookingsRouter;
