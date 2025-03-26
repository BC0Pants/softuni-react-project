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

postController.get("/all", async (req, res) => {
  try {
    const posts = await postService.getAll();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

postController.get("/by-flag/:flagId", async (req, res) => {
  try {
    const posts = await postService.getByFlagId(req.params.flagId);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching posts by flag' });
  }
});

postController.get("/:id", async (req, res) => {
  try {
    const post = await postService.getById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching post' });
  }
});

export default postController;
