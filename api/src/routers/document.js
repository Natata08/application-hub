import express from "express";

// This router can be deleted once you add your own router
const document = express.Router();

document.get("/", (req, res) => {
  res.json("This API route will handle with document");
});

export default document;
