const express = require("express");
const router = express.Router();
const dataAccessLayer = require("../dataAccessLayer");

// API/ - Home page
router.get("/", async (req, res) => {
  const users = await dataAccessLayer.getAllUsers(); // Get all users
  console.log("ROUTE: /api/"); // Log to the terminal
  res.json("API Home Page"); // Send response to the browser
});

// API/users - Get all users
router.get("/users", async (req, res) => {
  const users = await dataAccessLayer.getAllUsers(); // Get all users
  console.log("ROUTE: /api/users/"); // Log to the terminal
  console.log("Retreived all users:", users); // Log to the terminal
  res.json(users); // Send response to the browser
});

// API/users/:id - Get a user by ID
router.get("/users/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  const user = await dataAccessLayer.getUserById(parseInt(id)); // Get the user by ID
  if (user) {
    console.log(`ROUTE: /api/users/${id}/`); // Log to the terminal
    console.log("Retrieved user by ID:", user); // Log to the terminal
    res.json(user); // Send response to the browser
  } else {
    console.log(`User with ID ${id} not found`); // Log to the terminal
    res.status(404).json({ message: "User not found" }); // Send response to the browser
  }
});

// API/users - Create a new user
router.post("/users", async (req, res) => {
  const { first_name, last_name, username, email } = req.body; // Get user details from the request body
  const newUser = await dataAccessLayer.createUser(
    first_name,
    last_name,
    username,
    email
  ); // Create a new user√
  // Log a message indicating that the user was added
  res.status(201).json(newUser); // Send response to the browser
});

module.exports = router;
