const express = require("express");
const router = express.Router();
const dataAccessLayer = require("../dataAccessLayer");

// Define routes
// Route to render the form for creating a new user
router.get("/users/new", (req, res) => {
  res.render("newUser");
});

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

// Route to render the form for editing a user
router.get("/users/:id/edit", async (req, res) => {
  const { id } = req.params;
  const user = await dataAccessLayer.getUserById(parseInt(id));
  if (user) {
    res.render("editUser", { user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route to create a new user
router.post("/users", async (req, res) => {
  const { first_name, last_name, username, email } = req.body;
  const newUser = await dataAccessLayer.createUser(
    first_name,
    last_name,
    username,
    email
  );
  if (newUser) {
    res.render("newUserCreated", { newUser });
  } else {
    res.status(500).send("Error creating user");
  }
});

// Route to update a user
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, username, email } = req.body;
  const updatedUser = await dataAccessLayer.updateUser(
    parseInt(id),
    first_name,
    last_name,
    username,
    email
  );
  if (updatedUser) {
    res.render("updatedUser", { updatedUser });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route to delete a user
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await dataAccessLayer.deleteUser(parseInt(id));
  if (deletedUser) {
    res.send({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
