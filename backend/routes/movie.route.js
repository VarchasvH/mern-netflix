import express from "express";

// Import the movie controller functions
import {
  getMovieDetails,
  getMoviesByCategory,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingMovie,
} from "../controller/movie.controller.js";

// Create a new router instance
const router = express.Router();

// Set up routes for the movie API endpoints

// Get the trending movie
router.get("/trending", getTrendingMovie);

// Get the trailers for a specific movie
router.get("/:id/trailers", getMovieTrailers);

// Get the details of a specific movie
router.get("/:id/details", getMovieDetails);

// Get the similar movies for a specific movie
router.get("/:id/similar", getSimilarMovies);

// Get movies by category
router.get("/:category", getMoviesByCategory);

// Export the router
export default router;
