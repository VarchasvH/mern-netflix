/ * Imports * /;
// ?  External Imports
import express from "express";
import cookieParser from "cookie-parser";

// ? Local Imports
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { ENV_VARIABLES } from "../backend/config/envVariables.config.js";
import { connectDB } from "./config/db.config.js";
import protectRoute from "./middleware/protectRoute.js";
import path from "path";

// ? App Setup
const app = express();

const PORT = ENV_VARIABLES.PORT;
const __dirname = path.resolve();

// ? Middleware
app.use(express.json()); // Parse request body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ? Routes Middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if (ENV_VARIABLES.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/frontend/dist/index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDB();
});
