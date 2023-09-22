const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");

// Load Environment Variables
require("dotenv").config();

// Extract Environment Variables
const port = process.env.PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const uri = `mongodb+srv://${username}:${password}@sce.qcxkj8d.mongodb.net/${database}?retryWrites=true&w=majority`;

// Create an Express application
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use API Routes
app.use(apiRoutes);

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB.");

    app.listen(port, () => {
      console.log(`Node API App is Running on Port 3000.`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}.`);
  });
