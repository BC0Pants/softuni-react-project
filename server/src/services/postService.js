import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Post from "../models/postSchema.js";

dotenv.config();
const secret = process.env.JWT_SECRET;

function extractIdFromToken(json) {
  const token = json.token;
  if (!token) {
    throw new Error("Token is missing");
  }
  try {
    const decoded = jwt.verify(token, secret);
    return decoded?.id;
  } catch (error) {
    console.error("Error decoding JWT:", error.message);
    return null;
  }
}

export default {
  create(postData) {
    const postInfo = {
      author: extractIdFromToken(postData),
      title: postData.title,
      body: postData.body,
      picture: postData.picture,
      flags: postData.flagsId,
    };

    return Post.create(postInfo);
  },
};
