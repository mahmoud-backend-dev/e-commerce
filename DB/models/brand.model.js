import { Schema, Types, model } from "mongoose";

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "Brand Name already Exisit "],
      trim: true,
      required: true,
      minLength: [2, "too short of Brand Name "],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    logo: {
      id: { type: String, required: true },
      url: { type: String, required: true },
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Brand = model("brand", BrandSchema);
export default Brand;
