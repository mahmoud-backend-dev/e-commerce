import mongoose, { Types } from "mongoose";
import SubCategory from "./subCategory.model.js";
import cloudinary from "../../src/services/fileUploads/cloudinary.js";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Category Name already Exisit "],
      trim: true,
      required: true,
      minLength: [2, "too short of Category Name "],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: {
      id: { type: String },
      url: { type: String },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    brands: [
      {
        type: Types.ObjectId,
        ref: "brand",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

categorySchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    // delete all related SubCategories
    await SubCategory.deleteMany({
      categoryId: this._id,
    });
  // delete image category from cloudnairy
  await cloudinary.uploader.destroy(this.image.id)
  }
);
// virtual subCategory field
categorySchema.virtual("subCategory", {
  ref: "subCategory", //Model
  localField: "_id", // category
  foreignField: "categoryId", //subCategory
});
const Category = mongoose.model("category", categorySchema);
export default Category;


