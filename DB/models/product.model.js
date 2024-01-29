import { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: [true, "Product title already Exisit "],
      trim: true,
      required: true,
      minLength: [2, "too short of Product title "],
    },
    description: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: [5, "too short of Product description "],
    },
    imgCover: String,
    images: [],
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    sold: Number,
    rateAvg: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount: {
      type: Number,
      min: 0,
      default: 0,
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
    subcategoryId: {
      type: Types.ObjectId,
      ref: "subcategory",
    },
    brandId: {
      type: Types.ObjectId,
      ref: "brand",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.post("init", (doc) => {
  doc.imgCover = process.env.BASE_URL + "uploads/" + doc.imgCover;

  doc.images =
    process.env.BASE_URL +
    "uploads/" +
    doc.images.map((img) => {
      process.env.BASE_URL + "uploads/" + img;
    });
});
// pupolate reviews that belongs to a product
productSchema.virtual("reviews", {
  ref: "review",
  foreignField: "productId",
  localField: "_id",
});
productSchema.pre(/^find/,function(){ //['find','findOne'] it works with all or single
  this.populate('reviews')
})
const Product = model("product", productSchema);
export default Product;
