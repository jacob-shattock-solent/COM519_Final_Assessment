require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const Russia = require("./models/Russia")
const Ukraine = require("./models/Ukraine")
const app = express();
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

// app.get("/tasters", async (req, res) => {
//   res.render("tasters");
// });

app.get("/russias", async (req, res) => {
  const russias = await Russia.find({});
  console.log(russias)
  res.render("russias");
});

app.get("/ukraines", async (req, res) => {
  res.render("ukraines");
});

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
