import express from "express";
import {
  getSimilarTvs,
  getTrendingTv,
  getTvDetails,
  getTvsByCategory,
  getTvTrailers,
} from "../controller/tv.controller.js";

const router = express.Router();

// Set up routes for the Tv API endpoints

// Get the trending Tv
router.get("/trending", getTrendingTv);

// Get the trailers for a specific Tv
router.get("/:id/trailers", getTvTrailers);

// Get the details of a specific Tv
router.get("/:id/details", getTvDetails);

// Get the similar Tvs for a specific Tv
router.get("/:id/similar", getSimilarTvs);

// Get Tvs by category
router.get("/:category", getTvsByCategory);

export default router;
