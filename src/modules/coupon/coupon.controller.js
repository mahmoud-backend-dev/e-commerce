import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { deleteOne } from "../handler/handler.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import Coupon from "../../../DB/models/coupon.model.js";

const addCoupon = asyncHandler(async (req, res, next) => {
  const isExisit = await Coupon.findOne({ code: req.body.code });
  isExisit && next(new Error("coupon already exisit", { cause: 409 }));
  let coupon = new Coupon(req.body);

  await coupon.save();

  res.status(201).json({ message: "Coupon added successfuly", coupon });
});

const allCoupons = asyncHandler(async (req, res,next) => {
  let apiFeature = new ApiFeature(Coupon.find({}), req.query)
    .fields()
    .sort()
    .pagination()
    .filter()
    .search();
  const coupons = await apiFeature.mongoQuery;
  res.status(200).json({ message: "All Coupons", coupons });
});

const OneCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  !coupon && res.status(404).json({ message: "Coupon Not found" });
  coupon && res.status(200).json({ message: "Coupon of this Id:", coupon });
});

const updateCoupon = asyncHandler(async (req, res) => {

  const coupon = await Coupon.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  !coupon && res.status(404).json({ message: "Coupon Not found" });
  coupon && res.status(200).json({ message: "Coupon updated", coupon });
});

const deleteCoupon = deleteOne(Coupon);

export { addCoupon, allCoupons, deleteCoupon, updateCoupon, OneCoupon };
