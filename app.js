require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser")
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));


app.get("/", (req, res) => {
  res.render("index");
});

//---------------------------------------

app.post("/create-russia", russiaController.create )
app.get("/create-russia", (req, res) => {
  res.render("create-russia");
})

app.post("/create-ukraine", ukraineController.create )
app.get("/create-ukraine", (req, res) => {
  res.render("create-ukraine");
})

app.get("/russias", russiaController.list);
app.get("/ukraines", ukraineController.list);

app.get("/russias/delete/:id", russiaController.delete);
app.get("/ukraines/delete/:id", ukraineController.delete);



app.get("/russias/update/:id", russiaController.edit);

app.post("/russias/update/:id", russiaController.update);

app.get("/ukraines/update/:id", ukraineController.edit);

app.post("/ukraines/update/:id", ukraineController.update);

//---------------------------------------

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
