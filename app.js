require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
// cookie-parser helps us to create or put some values to the cookies or delete some value from cookies
var cookieParser = require("cookie-parser");
var cors = require("cors");

const authRoutes = require("./routes/auth");

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

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api", authRoutes);

// PORT
const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
