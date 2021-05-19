const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/the-hex");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to db"));
db.once("open", () => {
  console.log("successfully connected to the-hex database");
});
