const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8080;
// const db = require("./config/mongoose");

const app = express();

app.use(express.static("./assets"));

app.use("/", require("./routes/index"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, (err) => {
  if (err) {
    console.log("Error in running the server: ", err);
    return;
  }
  console.log("The hex is up and running on port " + port);
});
