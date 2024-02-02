import { Schema, Types, model } from "mongoose";

const subCategorySchema = new Schema({
  name: {
    type: String,
    unique: [true, "SubCategory Name already Exisit "],
    trim: true,
    required: true,
    minLength: [2, "too short of SubCategory Name "],
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "user",
  },
  categoryId: {
    type: Types.ObjectId,
    ref: "category",
  },
  image:{
    id:{type:String },
    url:{type:String }

  }
}, { timestamps: true});

const SubCategory = model("subCategory", subCategorySchema);
export default SubCategory;
