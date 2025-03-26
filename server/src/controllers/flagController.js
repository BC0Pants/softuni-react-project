import { Router } from "express";
import flagService from "../services/flagService.js";

const flagController = Router();

flagController.get("/all", async (req, res) => {
  try {
    const flags = await flagService.getAll();
    res.status(200).json(flags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching flags' });
  }
});

export default flagController; 