import express from "express";
import knex from "../database_client.js";
import bcrypt from "bcrypt";

const register = express.Router();

// Registration
register.post("/", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // Checking if the username already exists
    const existedUser = await knex("user").where({ email }).first();
    if (existedUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // Hashing the password before save in dB
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await knex("user").insert({
      email: email,
      first_name: first_name,
      last_name: last_name,
      password_hash: hashedPassword,
    });
    res.status(201).json({ message: "Registration was successful" });
  } catch (error) {
    res.status(500).json({ error: `Registration error: ${error.message}` });
  }
});

export default register;
