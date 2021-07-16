const mongoose = require("mongoose");
const env = require('./environment')
// console.log(env.db_URI)
mongoose
     .connect( env.db_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
