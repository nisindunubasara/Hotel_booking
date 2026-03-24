import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import axios from "axios";
import Stripe from "stripe";

const sendBookingConfirmationEmail = async (to, username, booking, roomData) => {
   try {
      const response = await axios.post(
         "https://api.brevo.com/v3/smtp/email",
         {
            sender: {
               name: "QuickStay",
               email: process.env.SENDER_EMAIL,
            },
            to: [{ email: to }],
            subject: "Booking Confirmation",
            htmlContent: `
               <h2>Your booking details</h2>
               <p>Dear ${username},</p>
               <p>Thank you for your booking! Here are your booking details:</p>
               <ul>
                  <li><strong>Booking ID:</strong> ${booking._id}</li>
                  <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                  <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                  <li><strong>Check-In:</strong> ${new Date(booking.checkInDate).toDateString()}</li>
                  <li><strong>Check-Out:</strong> ${new Date(booking.checkOutDate).toDateString()}</li>
                  <li><strong>Total Booking Amount:</strong> ${process.env.CURRENCY || "$"} ${booking.totalPrice}</li>
               </ul>
               <p>We look forward to hosting you!</p>
               <p>If you need to make any changes, please contact us.</p>
            `,
         },
         {
            headers: {
               "api-key": process.env.BREVO_API_KEY,
               "Content-Type": "application/json",
            },
         }
      );

      console.log("✅ Brevo mail sent:", response.data);
   } catch (error) {
      console.log("❌ Brevo mail error:", error.response?.data || error.message);
   }
};

const checkAvailability = async ({room, checkInDate, checkOutDate}) => {
   try {
      const bookings = await Booking.find({
         room,
         checkInDate: {$lt: checkOutDate},
         checkOutDate: {$gt: checkInDate},
      });
      const isAvailable = bookings.length === 0;
      return isAvailable;
   } catch (error) {
      console.error(error.message);
   }
}

export const checkAvailabilityAPI = async (req, res) => {
   try {
      const {room, checkInDate, checkOutDate} = req.body;
      const isAvailable = await checkAvailability({room, checkInDate, checkOutDate});
      res.json({success: true, isAvailable});
   } catch (error) {
      res.json({success: false, message: error.message});
   }
}

export const createBooking = async (req, res) => {
   try {
      const { room, checkInDate, checkOutDate, guests, paymentMethod } = req.body;
      const user = req.user._id;

      const isAvailable = await checkAvailability({
         room, 
         checkInDate, 
         checkOutDate
      });

      if (!isAvailable) {
         return res.json({success: false, message: "Room is not available for the selected dates."});
      }

      const roomData = await Room.findById(room).populate("hotel");
      let totalPrice = roomData.pricePerNight;

      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

      totalPrice *= nights;
      const booking = await Booking.create({
         user,
         room,
         hotel: roomData.hotel._id,
         guests: +guests,
         checkInDate,
         checkOutDate,
         totalPrice,
         paymentMethod,
      });

      res.json({success: true, message: "Booking created successfully"});

      sendBookingConfirmationEmail(req.user.email, req.user.username, booking, roomData);
      
   } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message});
   }
};

export const getUserBookings = async (req, res) => {
   try {
      const user = req.user._id;
      const bookings = await Booking.find({user}).populate("room").populate("room hotel").sort({createdAt: -1});
      res.json({success: true, bookings});
   } catch (error) {
      res.json({success: false, message: "Failed to fetch bookings"});
   }
}

export const getHotelBookings = async (req, res) => {
   try {
      const hotel = await Hotel.findOne({owner: req.auth.userId});
      if(!hotel) {
         return res.json({success: false, message: "Hotel not found"});
      }
      const bookings = await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({createdAt: -1});

      const totalBookings = bookings.length;
      const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

      res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}}); 

   } catch (error) {
      res.json({success: false, message: "Failed to fetch bookings"});
   }
}

export const stripePayment = async (req, res) => {
   try {
      const { bookingId } = req.body;
      console.log("CLICKED:", bookingId);
      console.log("BODY:", req.body);
      console.log("BOOKING ID:", bookingId);

      const booking = await Booking.findById(bookingId);
      if (!booking) {
         return res.json({ success: false, message: "Booking not found" });
      }

      const roomData = await Room.findById(booking.room).populate("hotel");
      if (!roomData) {
         return res.json({ success: false, message: "Room not found" });
      }

      const totalPrice = booking.totalPrice;
      const { origin } = req.headers;

      const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

      const line_items = [
         {
            price_data: {
               currency: "usd",
               product_data: {
                  name: roomData.hotel.name,
               },
               unit_amount: totalPrice * 100,
            },
            quantity: 1,
         }
      ];

      const session = await stripeInstance.checkout.sessions.create({
         line_items,
         mode: "payment",
         success_url: `${origin}/loader/my-bookings`,
         cancel_url: `${origin}/my-bookings`,
         metadata: {
            bookingId: booking._id.toString(),
         }
      });

      res.json({ success: true, url: session.url });

   } catch (error) {
      console.log("Stripe payment error:", error.message);
      res.json({ success: false, message: error.message });
   }
};