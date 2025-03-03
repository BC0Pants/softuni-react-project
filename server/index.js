import dotenv from "dotenv";
import express from "express";

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
  console.log("Hello world!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
