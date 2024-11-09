import express from "express";
import jwt from "jsonwebtoken";
import knex from "../database_client.js";

const userRoute = express.Router();
// JWT's secret Key
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware to verify the token for restrict outside reach to the db
function authenticateToken(req, res, next) {
  const tokenAuth = req.header("Authorization")?.split(" ")[1];
  if (!tokenAuth) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(tokenAuth, SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.userInfo = userInfo;
    next();
  });
}
// The endpoint is for getting user information in a safe way
userRoute.get("/me", authenticateToken, async (req, res) => {
  const requestedId = req.userInfo.userId;
  const userData = await knex("user").where({ user_id: requestedId }).first();
  //if user not found
  if (!userData) return res.status(404).json({ message: "User not found" });
  // If user is found and authenticated then returning the user data
  return res.status(200).json({ userData });
});

export default userRoute;
