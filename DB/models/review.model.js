import { Schema, Types, model } from "mongoose";

const ReviewSchema = new Schema({
    text: {
      type: String,
      trim: true,
      required: true,
      minLength: [2, "too short of Review text "],
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
    },
    productId: {
      type: Types.ObjectId,
      ref: "product",
    },
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
ReviewSchema.pre(/^find/,function(){ //['find','findOne'] it works with all or single
  this.populate('user','username','age')
})
const Review = model("review", ReviewSchema);
export default Review;
