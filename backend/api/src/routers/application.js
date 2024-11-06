import express from "express";

// This router can be deleted once you add your own router
const application = express.Router();

application.get("/", (req, res) => {
  res.json("This API route will handle with applications");
});

export default application;
