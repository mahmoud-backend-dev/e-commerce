import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { deleteOne } from "../handler/handler.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import Review from "../../../DB/models/review.model.js";

const addReview = asyncHandler(async (req, res) => {
  // req.body.image = req.files.filename
  req.body.user = req.user._id;
  let review = new Review(req.body);

  await review.save();

  res.status(201).json({ message: "Review added successfuly" });
});

const allReviews = asyncHandler(async (req, res) => {
  let apiFeature = new ApiFeature(Review.find({}), req.query)
    .fields()
    .sort()
    .pagination()
    .filter()
    .search();
  const reviews = await apiFeature.mongoQuery;
  res.status(200).json({ message: "All Reviews", reviews });
});

const OneReview = asyncHandler(async (req, res) => {
  const Review = await Review.findById(req.params.id);
  !Review && res.status(404).json({ message: "Review Not found" });
  Review && res.status(200).json({ message: "Review of this Id:", Review });
});

const updateReview = asyncHandler(async (req, res) => {
  // if(req.files) req.body.image = req.files.filename

  const review = await Review.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  !review && res.status(404).json({ message: "Review Not found" });
  review && res.status(200).json({ message: "Review updated", review });
});

const deleteReview = deleteOne(Review);

export { addReview, allReviews, deleteReview, updateReview, OneReview };
