import mongoose, { Types } from "mongoose";

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

// virtual subCategory field
categorySchema.virtual("subCategory", {
  ref: "subCategory", //Model
  localField: "_id", // category
  foreignField: "categoryId", //subCategory
});
const Category = mongoose.model("category", categorySchema);
export default Category;

// categorySchema.post("init", (doc) => {
//   doc.image = process.env.BASE_URL + "uploads/" + doc.image;
// });
