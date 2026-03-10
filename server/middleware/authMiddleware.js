// middleware/authMiddleware.js
import { users } from "@clerk/clerk-sdk-node";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth; // Clerk puts userId here automatically

    if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });

    // Find the user in your database
    let user = await User.findById(userId);

    // If user doesn't exist in your DB, create it from Clerk data
    if (!user) {
      const clerkUser = await users.getUser(userId);
      user = await User.create({
        _id: clerkUser.id,
        username: clerkUser.username || "NoName",
        email: clerkUser.emailAddresses[0].emailAddress,
        image: clerkUser.profileImageUrl,
        role: "user",
        recentSearchedCities: [],
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};