import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Post from "../models/postSchema.js";

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
  create(postData, token) {
    const userId = extractIdFromToken(token);
    if (!userId) {
      throw new Error("User authentication failed");
    }

    const postInfo = {
      author: userId,
      title: postData.title,
      body: postData.body,
      picture: postData.picture,
      flags: [postData.flagsId],
    };

    return Post.create(postInfo);
  },
  
  async getAll() {
    return Post.find().populate('author').populate('flags').sort({ createdAt: -1 });
  },
  
  async getById(id) {
    return Post.findById(id)
      .populate('author')
      .populate('flags')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username'
        }
      });
  },

  async getByFlagId(flagId) {
    return Post.find({ flags: flagId }).populate('author').populate('flags').sort({ createdAt: -1 });
  },

  async toggleLike(postId, token) {
    const userId = extractIdFromToken(token);
    if (!userId) {
      throw new Error("User authentication failed");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const hasLiked = post.likes.includes(userId);
    
    if (hasLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    
    // Return the post with all necessary fields populated
    return Post.findById(postId)
      .populate('author')
      .populate('flags')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username'
        }
      });
  },

  async delete(postId, token) {
    const userId = extractIdFromToken(token);
    if (!userId) {
      throw new Error("User authentication failed");
    }

    const post = await Post.findById(postId);
    if (!post) {
      return false;
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== userId) {
      throw new Error("Unauthorized to delete this post");
    }

    await Post.findByIdAndDelete(postId);
    return true;
  },

  async update(postId, postData, token) {
    const userId = extractIdFromToken(token);
    if (!userId) {
      throw new Error("User authentication failed");
    }

    const post = await Post.findById(postId);
    if (!post) {
      return false;
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== userId) {
      throw new Error("Unauthorized to edit this post");
    }

    // Update only allowed fields
    post.title = postData.title || post.title;
    post.body = postData.body || post.body;
    post.picture = postData.picture || post.picture;

    await post.save();

    // Return the updated post with all necessary fields populated
    return Post.findById(postId)
      .populate('author')
      .populate('flags')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username'
        }
      });
  }
};
