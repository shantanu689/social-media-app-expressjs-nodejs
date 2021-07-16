const mongoose = require("mongoose");
const env = require('./environment')
mongoose.connect(`${env.db_URI}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to db"));
db.once("open", () => {
  console.log("successfully connected to database");
});
