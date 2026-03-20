import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {

    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }

    console.log("AUTH:", req.auth);

    const { userId } = req.auth;
    console.log("req.auth:", req.auth);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user;

    next();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};