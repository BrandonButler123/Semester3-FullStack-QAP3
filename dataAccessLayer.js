const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "Fluffy",
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

const getUserById = async (id) => {
  //   return mockUsers.find((user) => user.id === id);
};

const createUser = async (username, email, age) => {};

const updateUser = async (id, username, email, age) => {};

const deleteUser = async (id) => {};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
