import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.post("/register", async (req, res) => {
  const userData = req.body;
  await authService.register(userData);
  res.end();
});

export default authController;
