import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    userId: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Please include the user id"],
        },
      ],
  },
  { timestamps: true },
  );


const Room = model("Room", roomSchema);
export default Room;
