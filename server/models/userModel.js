import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please include the email"],
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { timestamps: true },
  );


const User = model("User", userSchema);
export default User;
