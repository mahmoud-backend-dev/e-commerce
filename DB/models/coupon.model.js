import { Schema, Types, model } from "mongoose";

const CouponSchema = new Schema({
  code: {
      type: String,
      trim: true,
      minLength:1,
      maxLength: 8,
      required: true,
    },
  discount: {
      type: Number,
      min:5,
      max:80,
      required:true
    },
  expires:Date,
  createdBy: {
      type:Types.ObjectId,
      ref: "user",
      required:true
    }
},
  { timestamps: true }
);

const Coupon = model("coupon", CouponSchema);
export default Coupon;
