import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userSchema.js";

dotenv.config();
const secret = process.env.JWT_SECRET;

export default {
  register(userData) {
    return User.create(userData);
  },
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid email or password");
    }
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "2h" });
    return token;
  },
};
