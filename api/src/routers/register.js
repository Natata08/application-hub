import express from "express";

const register = express.Router();

register.get("/", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password required");
  }
  res.json({ message: "This is registration part" });
});

export default register;
