import { Router } from "express";
import postService from "../services/postService.js";

const postController = Router();

postController.post("/create", async (req, res) => {
  const postData = req.body;
  try {
    await postService.create(postData);
  } catch (error) {
    console.log(error);
  }
  res.end();
});

export default postController;
