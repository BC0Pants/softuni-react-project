import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
const port = process.env.PORT || 8080;
const db = process.env.DBURI;

try {
  const uri = `${db}`;
  await mongoose.connect(uri);
  console.log("DB connected");
} catch (error) {
  console.log("Cannot connect to DB");
  console.error(error);
}

const app = express();

app.get("/", (req, res) => {
  console.log("Hello world!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
