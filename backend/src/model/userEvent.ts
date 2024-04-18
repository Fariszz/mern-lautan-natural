import mongoose from "mongoose";

const userEvent = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "User",
  },
  event: {
    type: String,
    required: [true, "Event is required"],
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const UserEvent = mongoose.model("UserEvent", userEvent);