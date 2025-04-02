import { Router } from "express";
import commentService from "../services/commentService.js";

const commentController = Router();

commentController.post("/create/:postId", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const comment = await commentService.create(req.params.postId, req.body.content, token);
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

commentController.get("/by-post/:postId", async (req, res) => {
  try {
    const comments = await commentService.getByPostId(req.params.postId);
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

commentController.delete("/:commentId", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    await commentService.delete(req.params.commentId, token);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export default commentController; 