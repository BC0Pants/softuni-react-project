import { Schema, model } from "mongoose";

const postSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  flags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Flag",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Post = model("Post", postSchema);
export default Post;
