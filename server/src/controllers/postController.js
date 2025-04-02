import { Router } from "express";
import postService from "../services/postService.js";
import imgur from 'imgur';

const postController = Router();

// Configure Imgur client
imgur.API_URL = "https://api.imgur.com/3/";
imgur.credentials = {
  client_id: process.env.IMGUR_CLIENT_ID
};

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
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

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

postController.post("/:id/like", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const updatedPost = await postService.toggleLike(req.params.id, token);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

postController.post("/upload-image", async (req, res) => {
  try {
    const imageData = req.body.image;
    const response = await imgur.uploadBase64(imageData);
    res.status(200).json({ url: response.data.link });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Failed to upload image' });
  }
});

postController.delete("/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    await postService.delete(req.params.id, token);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

postController.put("/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const updatedPost = await postService.update(req.params.id, req.body, token);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export default postController;
