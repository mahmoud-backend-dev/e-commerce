import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

categorySchema.post("init", (doc) => {
  doc.image = process.env.BASE_URL + "uploads/" + doc.image;
});

const Category = mongoose.model("category", categorySchema);
export default Category;
