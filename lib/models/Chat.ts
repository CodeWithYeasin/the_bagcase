import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: { type: String, enum: ["user", "admin"], required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const ChatSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "open" },
    messages: { type: [MessageSchema], default: [] },
  },
  { timestamps: true }
);

export const ChatModel = models.Chat || model("Chat", ChatSchema);
