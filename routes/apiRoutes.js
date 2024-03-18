const express = require("express");
const router = express.Router();
const dataAccessLayer = require("../dataAccessLayer");

// Define a route to get all users
router.get("/users", async (req, res) => {
  const users = await dataAccessLayer.getAllUsers(); // Get all users
  console.log("Retreived all users:", users); // Log to the terminal
  res.json(users); // Send response to the browser
});

// Define a route to get a user by ID
router.get("/users/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  const user = await dataAccessLayer.getUserById(parseInt(id)); // Get the user by ID
  if (user) {
    console.log("Retrieved user by ID:", user); // Log to the terminal
    res.json(user); // Send response to the browser
  } else {
    console.log(`User with ID ${id} not found`); // Log to the terminal
    res.status(404).json({ message: "User not found" }); // Send response to the browser
  }
});

// Define a route to create a new user
router.post("/users", async (req, res) => {
  const { username, email, age } = req.body; // Get user details from the request body
  const newUser = await dataAccessLayer.createUser(username, email, age); // Create a new user
  res.status(201).json(newUser); // Send response to the browser
});

module.exports = router;
