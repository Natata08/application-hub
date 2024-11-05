import express from "express";
import jwt from "jsonwebtoken";
import knex from "../database_client.js";

// This router can be deleted once you add your own router
const userRoute = express.Router();
// JWT's secret Key
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware to verify the token for restrict outside reach to the db
function authenticateToken(req, res, next) {
  const tokenAuth = req.header("Authorization")?.split(" ")[1];
  if (!tokenAuth) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(tokenAuth, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;

    next();
  });
}

userRoute.get("/:id", authenticateToken, async (req, res) => {
  const requestedId = parseInt(req.params.id);
  // Check if the authenticated user matches the requested user ID

  if (req.user.userId !== requestedId) {
    return res.status(403).json({ message: "Access denied" });
  }
  const userData = await knex("user").select("*");
  const user = userData.find((u) => u.user_id === requestedId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export default userRoute;
