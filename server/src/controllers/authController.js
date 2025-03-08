import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.post("/register", async (req, res) => {
  const userData = req.body;
  try {
    await authService.register(userData);
  } catch (error) {
    console.log(error.message);
  }
  res.end();
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.cookie("auth", token);
  } catch (error) {
    console.log(error.message);
    res.status(401);
  }
  res.end();
});

export default authController;
