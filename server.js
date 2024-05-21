require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routers/router");
const errorHandler = require("./src/middelwares/errHendeler");
const redis = require("redis");
const app = express();

const pass = process.env.PASSWORD_MONGODB;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler);

mongoose.set("strictQuery", false);

mongoose
  .connect(`mongodb+srv://mhendriakbar:${pass}@jeniusapi.wyaoqa9.mongodb.net/?retryWrites=true&w=majority&appName=jeniusAPI`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Node running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
