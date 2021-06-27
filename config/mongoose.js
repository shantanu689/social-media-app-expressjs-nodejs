const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/the-hex", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to db"));
db.once("open", () => {
  console.log("successfully connected to the-hex database");
});
