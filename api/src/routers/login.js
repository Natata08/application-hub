import express from "express";
import knex from "../database_client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// This router can be deleted once you add your own router
const login = express.Router();

login.get("/", async (req, res) => {
  const { username, password } = req.body;
  // Checking if we get the username and password
  if (!username || !password) {
    return res.status(400).send("Username and password required");
  }
  try {
    const user = await knex("user").where({ username }).first();
    //Checking if user exist
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    // Comparing hashed password from db with the provided password

    const isPasswordRight = await bcrypt.compare(password, user.password);
    if (isPasswordRight) {
      const userInfo = {
        // What we have to send if password is right
        id: user.id,
        username: user.username,
      };
      // creating token for the user
      const token = jwt.sign({ userId: user.id }, "secret-key", { expiresIn: "1h" });
      // Sending user data with token
      res.status(200).json({ user: userInfo, token });
    } else {
      // Invalid password
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).send("Error logging in: " + error.message);
  }
});

export default login;
