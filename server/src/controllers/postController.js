import { Router } from "express";
import postService from "../services/postService.js";

const postController = Router();

postController.post("/create", async (req, res) => {
  const postData = req.body;
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    await postService.create(postData, token);
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export default postController;
