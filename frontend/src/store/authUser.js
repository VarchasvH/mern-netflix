import axios from "axios"; // Axios for making HTTP requests
import toast from "react-hot-toast"; // Toaster for displaying toast messages
import { create } from "zustand"; // State management library

/**
 * AuthUser store for managing authentication related data and state
 * @returns {Object} - The authUser store
 */
export const useAuthStore = create((set) => ({
  // Current authenticated user
  user: null,
  // Flag to indicate if user is signing up
  isSigningUp: false,
  // Flag to indicate if user is checking authentication
  isCheckingAuth: true,
  // Flag to indicate if user is logging out
  isLoggingOut: false,
  // Flag to indicate if user is logging in
  isLoggingIn: false,
  /**
   * Signup function to handle user signup
   * @param {Object} credentials - The user's credentials
   * @returns {Promise<void>} - A promise that resolves when signup is complete
   */
  signup: async (credentials) => {
    set({ isSigningUp: true }); // Set the signup flag to true
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials); // Make a POST request to signup
      set({ user: response.data.user, isSigningUp: false }); // Set the user and signup flag to false
      toast.success("Account created successfully"); // Show success toast message
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed"); // Show error toast message
      set({ isSigningUp: false, user: null }); // Set signup flag to false and user to null
    }
  },
  /**
   * Login function to handle user login
   * @param {Object} credentials - The user's credentials
   * @returns {Promise<void>} - A promise that resolves when login is complete
   */
  login: async (credentials) => {
    set({ isLoggingIn: true }); // Set the login flag to true
    try {
      const response = await axios.post("/api/v1/auth/login", credentials); // Make a POST request to login
      set({ user: response.data.user, isLoggingIn: false }); // Set the user and login flag to false
    } catch (error) {
      set({ isLoggingIn: false, user: null }); // Set login flag to false and user to null
      toast.error(error.response.data.message || "Login failed"); // Show error toast message
    }
  },
  /**
   * Logout function to handle user logout
   * @returns {Promise<void>} - A promise that resolves when logout is complete
   */
  logout: async () => {
    set({ isLoggingOut: true }); // Set the logout flag to true
    try {
      await axios.post("/api/v1/auth/logout"); // Make a POST request to logout
      set({ user: null, isLoggingOut: false }); // Set user to null and logout flag to false
      toast.success("Logged out successfully"); // Show success toast message
    } catch (error) {
      set({ isLoggingOut: false }); // Set logout flag to false
      toast.error(error.response.data.message || "Logout failed"); // Show error toast message
    }
  },
  /**
   * AuthCheck function to check authentication
   * @returns {Promise<void>} - A promise that resolves when authentication check is complete
   */
  authCheck: async () => {
    set({ isCheckingAuth: true }); // Set the auth check flag to true
    try {
      const response = await axios.get("/api/v1/auth/authCheck"); // Make a GET request to auth check
      set({ user: response.data.user, isCheckingAuth: false }); // Set the user and auth check flag to false
    } catch (error) {
      set({ isCheckingAuth: false, user: null }); // Set auth check flag to false and user to null
      console.log("Error :: AuthCheck : AuthUser : Store", error); // Log the error
    }
  },
}));
