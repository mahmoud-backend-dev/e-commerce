import User from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

const addToWishList = asyncHandler(async (req, res) => {
  const wishList = await User.findByIdAndUpdate(
    req.use._id,
    { $addToSet: { wishList: req.body.productId } },
    { new: true }
  ).populate("wishList");
  !wishList && res.status(404).json({ message: "WishList Not found" });
  wishList &&
    res.status(201)
      .json({ message: "WishList updated", wishList: wishList.wishList });
});
const removeFromWishList = asyncHandler(async (req, res) => {
  const { wishList } = await User.findByIdAndUpdate(
    req.use._id,
    { $pullAll: { wishList: req.params.id } }, // productId in wishList array ,
    { new: true }
  ).populate("wishList");
  !wishList && res.status(404).json({ message: "WishList Not found" });
  wishList && res.status(200).json({ message: "WishList updated", wishList });
});
const getWishList = asyncHandler(async (req, res) => {
  const { wishList } = await User.findById(req.user._id).populate("wishList");;
  !wishList && res.status(404).json({ message: "WishList Not found" });
  wishList && res.status(200).json({ message: "WishLists : ", wishList });
});
export { addToWishList, removeFromWishList ,getWishList};
