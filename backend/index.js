import express from "express";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.SECRET);
app.listen(port, () => console.log(`Server listening on port ${port}`));
