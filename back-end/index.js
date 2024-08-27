const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

// Mongodb database connection

mongoose.connect(
  "mongodb+srv://luongvietan:231123@cluster0.jyd9e.mongodb.net/e-commerce"
);

// API Creation

app.get("/", (request, response) => {
  response.send("Express App is running");
});

app.listen(port, () => {
  if (!error) {
    console.log("Server running on port : ", port);
  } else {
    console.log(`Error : `, error);
  }
});
