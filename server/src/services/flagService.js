import Flag from "../models/flagSchema.js";

export default {
  async getAll() {
    return Flag.find();
  }
}; 