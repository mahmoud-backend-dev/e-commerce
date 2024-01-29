import { Schema, Types, model } from "mongoose";

const BrandSchema = new Schema({
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
  logo:String,
  createdBy: {
    type: Types.ObjectId,
    ref: "user",
  }
}, { timestamps: true});
BrandSchema.post('init', (doc)=>{
  doc.logo = process.env.BASE_URL +'uploads/' + doc.logo
})
const Brand = model("brand", BrandSchema);
export default Brand;
