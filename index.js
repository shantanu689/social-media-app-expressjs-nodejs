require("dotenv").config();
const express = require("express");
const env = require("./config/environment");
const s3 = require('./config/aws-config')
const logger = require('morgan')
const port = process.env.PORT || 8080;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const cookieParser = require("cookie-parser");

const app = express();

// Setup the chat server to be used with socket.io
const server = require('http').Server(app)
const chatSockets = require("./config/chat_sockets").chatSockets(server);

const path = require("path");

if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, env.asset_path)));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(logger(env.morgan.mode, env.morgan.options))

app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(
  session({
    name: "the-hex",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: env.db_URI,
        autoRemove: "disabled",
      },
      (err) => {
        console.log("inside app.js", err);
      }
    ),
  })
);
// All routes must be below it
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes/index"));

server.listen(port, (err) => {
  if (err) {
    console.log("Error in running the server: ", err);
    return;
  }
  console.log("The hex is up and running on port " + port);
});
