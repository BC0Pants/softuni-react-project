import User from "../models/userSchema.js";

export default {
  register(userData) {
    return User.create(userData);
  },
};
