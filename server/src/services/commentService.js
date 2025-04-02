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
      content,
      post: postId
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id }
    });

    return Comment.findById(comment._id)
      .populate('author', 'username')
      .populate({
        path: 'post',
        select: 'title flags',
        populate: {
          path: 'flags',
          select: '_id'
        }
      });
  },

  async getAll() {
    return Comment.find()
      .populate('author', 'username')
      .populate({
        path: 'post',
        select: 'title flags',
        populate: {
          path: 'flags',
          select: '_id'
        }
      })
      .sort({ createdAt: -1 });
  },

  async getByPostId(postId) {
    return Comment.find({ post: postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
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

    // Update the post to remove the comment reference if the post exists
    try {
      await Post.findByIdAndUpdate(comment.post, {
        $pull: { comments: commentId }
      });
    } catch (error) {
      console.error('Error updating post:', error);
      // Continue with comment deletion even if post update fails
    }

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);
  },

  async edit(commentId, content, token) {
    const userId = extractIdFromToken(token);
    if (!userId) {
      throw new Error("User authentication failed");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.author.toString() !== userId) {
      throw new Error("You can only edit your own comments");
    }

    comment.content = content;
    await comment.save();

    return Comment.findById(commentId)
      .populate('author', 'username')
      .populate({
        path: 'post',
        select: 'title flags',
        populate: {
          path: 'flags',
          select: '_id'
        }
      });
  }
}; 