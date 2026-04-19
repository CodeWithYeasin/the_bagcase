import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    material: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    badge: { type: String },
    discountPercent: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    isNew: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const ProductModel = models.Product || model("Product", ProductSchema);
