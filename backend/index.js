import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import loginRouter from "./routes/Login.js";
import errorHandler from "./middleware/error-handler.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/user", loginRouter);
app.use(errorHandler);
const start = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
