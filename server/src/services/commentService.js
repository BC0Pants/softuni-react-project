import Comment from "../models/commentSchema.js";
import Post from "../models/postSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;

function extractIdFromToken(token) {
  if (!token) {
    throw new Error("Token is missing");
  }
  try {
    const decoded = jwt.verify(token, secret);
    return decoded?.id;
  } catch (error) {
    console.error("Error decoding JWT:", error.message);
    throw new Error("Invalid authentication token");
  }
}

export default {
  async create(postId, content, token) {
    const userId = extractIdFromToken(token);
    if (!userId) {
      throw new Error("User authentication failed");
    }

    const comment = await Comment.create({
      author: userId,
      content
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id }
    });

    return Comment.findById(comment._id).populate('author', 'username');
  },

  async getByPostId(postId) {
    const post = await Post.findById(postId).populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'username'
      }
    });
    return post.comments.sort((a, b) => b.createdAt - a.createdAt);
  },

  async delete(commentId, token) {
    const userId = extractIdFromToken(token);
    if (!userId) {
      throw new Error("User authentication failed");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.author.toString() !== userId) {
      throw new Error("You can only delete your own comments");
    }

    await Post.updateOne(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );

    return Comment.findByIdAndDelete(commentId);
  }
}; 