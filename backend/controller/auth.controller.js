import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

/*
 * Signup Controller
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The JSON response
 */
export const signup = async (req, res) => {
  try {
    // Destructure the request body
    const { email, password, username } = req.body;

    // Validate the request body
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate the email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // Validate the password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check if the user already exists - Email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Check if the user already exists - Username
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    // Generate a salt
    const salt = await bcryptjs.genSalt(10);

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Profile Pics
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    // Generate a random profile pic
    const randomImage =
      PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image: randomImage,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      // Save the user
      await newUser.save();

      // Send the response
      res
        .status(201)
        .json({ success: true, user: { ...newUser._doc, password: "" } });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Failed to create user" });
    }
  } catch (error) {
    // Error Handling
    console.log("Error :: SignUp Controller :: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/*
 * Login Controller
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The JSON response
 */
export const login = async (req, res) => {
  try {
    // Destructure the request body
    const { email, password } = req.body;

    console.log(email, password);
    // Check if all fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If user does not exist, return error
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare the provided password with the stored password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    // If password is incorrect, return error
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate the token and set the cookie
    generateTokenAndSetCookie(user._id, res);

    // Send the response with the user details
    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: "" } });
  } catch (error) {
    // Error Handling
    console.log("Error :: Login Controller :: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/*
 * Logout Controller
 * Clears the "netflix_jwt_token" cookie and sends a success response.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The JSON response
 */
export const logout = async (req, res) => {
  try {
    // Clear the "netflix_jwt_token" cookie
    res.clearCookie("netflix_jwt_token");

    // Send a success response
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    // Error Handling
    console.log("Error :: Logout Controller :: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const authCheck = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error :: AuthCheck Controller :: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
