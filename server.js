const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dbConfig = require("./config/development.config");

// Create express app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database connection
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App successfully connected with database!");
  })
  .catch((err) => {
    console.log("App failed to connect with the database. Exiting...", err);
    process.exit();
  });

// Define routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the book API" });
});
require("./app/routes/book.routes")(app);

// Listen for requests
app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
