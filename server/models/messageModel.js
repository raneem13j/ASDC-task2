import mongoose from "mongoose";
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Please include the Room id"],
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please include the user id"],
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);
export default Message;
