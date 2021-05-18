const express = require("express");
const port = 8080;
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

// const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded());
// app.use(cookieParser());

app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "the-hex",
    secret: "something",
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost:27017/the-hex",
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err);
      }
    ),
  })
);
// All routes must be below it
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/index"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in running the server: ", err);
    return;
  }
  console.log("The hex is up and running on port " + port);
});
