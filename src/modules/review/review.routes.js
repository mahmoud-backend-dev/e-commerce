import { Router } from "express";
import * as ReviewController from "./review.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { uploadFiles, uploadSingleFile } from "../../services/fileUploads/multer.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";
import * as JoiVal from "./review.validation.js";

const reviewRouter = Router();
//Merge param
// app.use("/:Review/subcategories", SubreviewRouter);

reviewRouter
  .route("/")                                                    
  .post(
    protectedRoute,
    allowTo('user'),
    uploadFiles("img"),
    validation(JoiVal.addReviewVal),
    ReviewController.addReview
  )
  .get(ReviewController.allReviews);

reviewRouter
  .route("/:id")
  .get(validation(JoiVal.paramsIdVal), ReviewController.OneReview)
  .put(
    protectedRoute,
    allowTo('user'),
    uploadSingleFile("img"),
    validation(JoiVal.updateReviewVal),
    ReviewController.updateReview
  )
  .delete(
    protectedRoute,
    allowTo('user','admin'),
    validation(JoiVal.paramsIdVal),
    ReviewController.deleteReview
  );

export default reviewRouter;
