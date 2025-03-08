import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";

dotenv.config();
const port = process.env.PORT || 8080;
const db = process.env.DBURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("DB connected");
  } catch (error) {
    console.error("Cannot connect to DB", error);
  }
};

connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
