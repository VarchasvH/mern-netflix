import express from "express";
import {
  getSearchHistory,
  removeFromSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controller/search.controller.js";

const router = express.Router();

// Route - /api/v1/search
router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);

router.get("/history", getSearchHistory);

router.delete("/history/:id", removeFromSearchHistory);

export default router;
