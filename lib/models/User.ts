import { Schema, model, models } from "mongoose";

export type UserRole = "user" | "admin";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    image: { type: String },
    provider: { type: String, default: "credentials" },
  },
  { timestamps: true }
);

export const UserModel = models.User || model("User", UserSchema);
