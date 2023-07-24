import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;

const start = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (error) {}
  console.log(process.env.SECRET);
};

start();
