import Hotel from "../models/Hotel.js";
import User from "../models/User.js";   

export const registerHotel = async (req, res) => {
   try {
      const {name, city, address, contact} = req.body;
      const owner = req.user._id;

      const hotel = await Hotel.findOne({owner})
      if(hotel) {
         return res.json({success: false, message: "Hotel already registered"});
      }

      await Hotel.create({name, city, address, contact, owner});
      await User.findByIdAndUpdate(owner, {role: "hotelOwner"});
      res.json({success: true, message: "Hotel Registered Successfully"});

   } catch (error) {
      res.json({success: false, message: error.message});
   }
}