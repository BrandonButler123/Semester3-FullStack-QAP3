const express = require("express");
const router = express.Router();
const dataAccessLayer = require("../dataAccessLayer");

// Define routes
router.get("/", (req, res) => {
  res.send("Welcome to the user API");
});

module.exports = router;
