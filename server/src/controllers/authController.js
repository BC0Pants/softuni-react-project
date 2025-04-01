import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.post("/register", async (req, res) => {
  const userData = req.body;
  try {
    await authService.register(userData);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.cookie("auth", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default authController;
