const express = require("express");
const methodOverride = require("method-override");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Routes
const apiRoutes = require("./routes/apiRoutes");
const webRoutes = require("./routes/webRoutes");
app.use("/api", apiRoutes);
app.use("/", webRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
