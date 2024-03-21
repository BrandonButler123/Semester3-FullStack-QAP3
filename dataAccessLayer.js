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
  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      parseInt(id),
    ]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const createUser = async (first_name, last_name, username, email) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO users (first_name, last_name, username, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, username, email]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

// function to update a user in the database
const updateUser = async (id, first_name, last_name, username, email) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE users SET first_name = $1, last_name = $2, username = $3, email = $4 WHERE id = $5 RETURNING *",
      [first_name, last_name, username, email, id]
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
