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
      flags: postData.flagsId,
    };

    return Post.create(postInfo);
  },
  
  async getAll() {
    return Post.find().populate('author').populate('flags').sort({ createdAt: -1 });
  },
  
  async getById(id) {
    return Post.findById(id).populate('author').populate('flags');
  },

  async getByFlagId(flagId) {
    return Post.find({ flags: flagId }).populate('author').populate('flags').sort({ createdAt: -1 });
  }
};
