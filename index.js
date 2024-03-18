const express = require("express");
const methodOverride = require("method-override");
const app = express();
const usersRouter = require("./routes/users");

const port = 3000;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.use("/index", usersRouter);

// app.get("/users", (req, res) => {
//   res.render("users");
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
