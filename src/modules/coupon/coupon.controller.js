import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { deleteOne } from "../handler/handler.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import Coupon from "../../../DB/models/coupon.model.js";
import randomstring from "randomstring";

const addCoupon = asyncHandler(async (req, res, next) => {
  // generate code
  const code = randomstring.generate({
    length: 8,
    charset: "alphanumeric",
  });
  // create Coupon
  const coupon = await Coupon.create({
    code,
    createdBy: req.user._id,
    discount: req.body.discount,
    expires: new Date(req.body.expires).getDate(),
  });
  res.status(201).json({ message: "Coupon added successfuly", coupon });
});

const allCoupons = asyncHandler(async (req, res, next) => {
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

const updateCoupon = asyncHandler(async (req, res,next) => {
  // check coupon
  const coupon = await Coupon.findOne({
    code: req.params.code,
    createdBy: req.user._id,
    expires: { $gt: Date.now() },
  });
  !coupon && res.status(404).json({ message: "Coupon Not found" });
  // check owner
  if (coupon.createdBy.toString() !== req.user._id.toString())
    return next(new Error("you are not authorized", { cause: 403 }));
  // update
  coupon.discount = req.body.discount ? req.body.discount : coupon.discount;
  coupon.expires = req.body.expires
    ? new Date(req.body.expires).getDate()
    : coupon.expires;

  await coupon.save();
  coupon && res.status(200).json({ message: "Coupon updated", coupon });
});

const deleteCoupon = asyncHandler(async (req, res,next) => {
    // check coupon
    const coupon = await Coupon.findOne({
      code: req.params.code,
      createdBy: req.user._id,
      expires: { $gt: Date.now() },
    });
    !coupon && res.status(404).json({ message: "Coupon Not found" });
    // check owner
    if (req.user._id.toString() != coupon.createdBy.toString())
      return next(new Error("you are not authorized", { cause: 403 }));
  // delete 
  await coupon.deleteOne();

  coupon && res.status(200).json({ message: "Coupon deleted", coupon });

})

export { addCoupon, allCoupons, deleteCoupon, updateCoupon, OneCoupon };
