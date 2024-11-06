import express from "express";

// This router can be deleted once you add your own router
const dashboard = express.Router();

dashboard.get("/", (req, res) => {
  res.json("This API route will handle with dashboard");
});

export default dashboard;
