const { error, log } = require("console");
const express = require("express");
const db = require("./config/userDB");
const router = require("./routers/user.routers");
const cookieParser = require("cookie-parser");

const port = 8000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, (error) => {
  db();
  if (!error) {
    console.log("Server Start at :- http://localhost:" + port);
  }
})