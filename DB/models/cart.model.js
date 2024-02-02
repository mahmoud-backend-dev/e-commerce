import { Schema, Types, model } from "mongoose";

const CartSchema = new Schema({
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    cartItems: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
      },
    ],
    totalPrice:Number,
    totalPriceAfterDiscount:Number,
    discount:Number,
  },
  { timestamps: true }
);

const Cart = model("cart", CartSchema);
export default Cart;
