import express from "express";
import knex from "../database_client.js";
import bcrypt from "bcrypt";

const register = express.Router();

register.get("/", (req, res) => {
  //   const { username, password } = req.body;
  //   if (!username || !password) {
  //     return res.status(400).send("Username and password required");
  //   }
  //   res.json({ message: "This is registration part" });
});

// This is an test route

register.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password required");
  }
  try {
    // Checking if the username already exists
    const existedUser = await knex("user").where({ username }).first();
    if (existedUser) {
      return res.status(400).send("Username already exists");
    }
    // Hashing the password before save in dB
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await knex("user").insert({
      username: username,
      password: hashedPassword,
    });
    res.status(201).send("registered succesfully");
  } catch (error) {
    console.log("Error registering the user");
    res.status(500).send("Error registrariton: " + error.message);
  }
});

export default register;
