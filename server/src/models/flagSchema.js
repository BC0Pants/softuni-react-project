import { Schema, model } from "mongoose";

const flagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: false,
  },
});

const Flag = model("Flag", flagSchema);

export default Flag;
