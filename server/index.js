const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json())

app.use('/auth', require('./routers/userRouter'))
app.use('/product', require('./routers/productRouter'))

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`LISTENING ON ${PORT}`);
});

mongoose.connect(
  process.env.MDB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to mongo db");
  }
);
