import express from "express";

// This router can be deleted once you add your own router
const login = express.Router();

login.get("/", (req, res) => {
  res.json("This api handles with login");
});

export default login;
