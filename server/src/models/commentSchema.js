import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = model("Comment", commentSchema);

export default Comment; 