const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "password",
  port: 5432,
});

// const mockUsers = [
//   { id: 1, username: "john_doe", email: "john.doe@example.com", age: 30 },
//   { id: 2, username: "jane_smith", email: "jane.smith@example.com", age: 25 },
// ];

// function to get all users from the database
const getAllUsers = async () => {
  // return mockUsers;
  const client = await pool.connect(); // connect to the database
  try {
    const result = await client.query("SELECT * FROM users"); // execute the query
    return result.rows; // return the rows
  } finally {
    client.release();
  }
};

// function to get a user by ID from the database
const getUserById = async (id) => {
  //   return mockUsers.find((user) => user.id === id);
  const client = await pool.connect();
  console.log("id", id);
  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      parseInt(id),
    ]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const createUser = async (username, email, age) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO users (username, email, age) VALUES ($1, $2, $3) RETURNING *",
      [username, email, age]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

// function to update a user in the database
const updateUser = async (id, username, email, age) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE users SET username = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
      [username, email, age, id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

// function to delete a user from the database
const deleteUser = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query("DELETE FROM users WHERE id = $1", [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
