import mongoose from "mongoose";
import { ENV_VARIABLES } from "./envVariables.config.js";

export const connectDB = async (req, res) => {
  try {
    const connect = await mongoose.connect(ENV_VARIABLES.MONGO_URI);
    console.log("MongoDB connected: ", connect.connection.host);
  } catch (error) {
    // 1 is error and 0 is success
    console.error("Error :: ", error);
    process.exit(1);
  }
};
