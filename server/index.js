import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("Hello world!");
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
