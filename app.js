require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const Russia = require("./models/Russia")
const Ukraine = require("./models/Ukraine")
const app = express();

//controllers

const russiaController = require("./controllers/russia");
const ukraineController = require("./controllers/ukraine");

app.set("view engine", "ejs");



/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

mongoose.set('strictQuery', true);

const { WEB_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

//---------------------------------------

app.get("/russias", russiaController.list);
app.get("/ukraines", ukraineController.list);

//---------------------------------------

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
