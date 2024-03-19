const express = require("express");
const router = express.Router();
const dataAccessLayer = require("../dataAccessLayer");

// Define routes
// Route to get all users
router.get("/users", async (req, res) => {
  const users = await dataAccessLayer.getAllUsers();
  res.render("users", { users }); // Render the 'users' template with user data
});

// Route to get a user by ID
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await dataAccessLayer.getUserById(parseInt(id));
  if (user) {
    res.render("user", { user }); // Render the 'user' template with the user data
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route to create a new user
router.post("/users", async (req, res) => {
  const { username, email, age } = req.body;
  const newUser = await dataAccessLayer.createUser(username, email, age);
  res.status(201).json(newUser);
});

// Route to update a user
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, age } = req.body;
  const updatedUser = await dataAccessLayer.updateUser(
    parseInt(id),
    username,
    email,
    age
  );
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route to delete a user
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await dataAccessLayer.deleteUser(parseInt(id));
  if (deletedUser) {
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
