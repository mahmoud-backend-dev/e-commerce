import { Schema, Types, model } from "mongoose";

const CouponSchema = new Schema({
    code: {
      type: String,
      trim: true,
      required: true,
    },
    discount: {
      type: Number
    },
    expires:Date,
    createdBy: {
      type:Types.ObjectId,
      ref: "user",
    }
},
  { timestamps: true }
);

const Coupon = model("coupon", CouponSchema);
export default Coupon;
