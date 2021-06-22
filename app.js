require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true, // This is compulory
    useUnifiedTopology: true, // It helps us keep our database connection alive
    useCreateIndex: true, // You can read about all these more in mongoose docs
  })
  .then(() => {
    console.log("DB CONNECTED!");
  })
  .catch(() => {
    console.log("DB CONNECTION FAILED!");
  });

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
