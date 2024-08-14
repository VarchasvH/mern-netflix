import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARIABLES } from "../config/envVariables.config.js";

const protectRoute = async (req, res, next) => {
  try {
    // Get the token from the request cookies
    const token = req.cookies.netflix_jwt_token;

    // Log the token for debugging
    console.log("Token from Cookies:", token);

    // If no token provided, return unauthorized response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, Please Login First!",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, ENV_VARIABLES.JWT_SECRET);

    // Log the decoded token for debugging
    console.log("Decoded Token:", decoded);

    // If token verification fails, return unauthorized response
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, Invalid Token!",
      });
    }

    // Find the user by their ID and exclude the password field
    const user = await User.findById(decoded.userId).select("-password");

    // Log the user object for debugging
    console.log("User from DB:", user);

    // If user not found, return unauthorized response
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, User Not Found!",
      });
    }

    // Add the user object to the request object
    req.user = user;

    // Call the next middleware
    next();
  } catch (error) {
    // Log the error and return server error response
    console.log("Error :: Protected Route ::", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error, Please Try Again!",
    });
  }
};

export default protectRoute;
