import jwt from "jsonwebtoken";
import { ENV_VARIABLES } from "../config/envVariables.config.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARIABLES.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("netflix_jwt_token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
    httpOnly: true,
    sameSite: "strict",
    secure: ENV_VARIABLES.NODE_ENV !== "development",
  });

  return token;
};
