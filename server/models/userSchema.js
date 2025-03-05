import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [5, "Username should be at least five characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: "Email must be a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Password should be at least four characters long"],
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
  },
});

userSchema.pre("validate", function (next) {
  if (this.email) {
    this.email = validator.normalizeEmail(this.email, {
      all_lowercase: true,
    });
  }

  if (this.password != this.rePassword) {
    this.invalidate("password", "Passwords must match");
  }

  next();
});

userSchema.post("validate", async function () {
  this.role = UserRoles.User;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema.virtual("rePassword", {
  get() {
    return this._rePassword;
  },
  set(value) {
    this._rePassword = value;
  },
});

export default User;
