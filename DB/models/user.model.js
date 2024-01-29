import { Schema, Types, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
  {
    username: String,
    profilePic: {
      url: { type: String },
      id: {
        type: String,
      },
    },
    coverImages: [
      {
        url: { type: String },
        id: {
          type: String,
        },
      },
    ],
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    changePassAt:Date,
    age: {
      type: Number,
      min: [10, "اكبر الاول بعدين نتفاهم"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    wishList:[{
      type:Types.ObjectId,
      ref:"product"
    }],
    addresses:[{
      street:String,
      phone:String,
      city:String
    }],
    forgetCode: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailConfirm: {
      type: Boolean,
      default: false,
    },
    forgetCode: {
      type: String,
      unique: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function() {
  if(this.password)
  this.password = bcryptjs.hashSync(this.password, +process.env.SALT);
});
userSchema.pre("findOneAndUpdate", function(){
  if(this.__update.password)
  this.__update.password = bcryptjs.hashSync(this.__update.password , process.env.SALT);
});


const User = model("user", userSchema);
export default User;
