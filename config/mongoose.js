const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/27017");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to db"));
db.once("on", () => {
  console.log("successfully connected to db!");
});
