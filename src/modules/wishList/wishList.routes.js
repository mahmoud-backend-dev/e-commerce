import { Router } from "express";
import * as WishListController from "./wishList.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { uploadSingleFile } from "../../services/fileUploads/multer.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";
import * as JoiVal from "./wishList.validation.js";

const wishListRouter = Router();

wishListRouter
  .route("/")
  .patch(
    protectedRoute,
    allowTo("user"),
    validation(JoiVal.addToWishListVal),
    WishListController.addToWishList
  )
  .get(protectedRoute, allowTo("user"), WishListController.getWishList);

wishListRouter
  .route("/:id")
  // .get(validation(JoiVal.paramsIdVal), WishListController.OneWishList)
  .delete(
    protectedRoute,
    allowTo("user", "admin"),
    validation(JoiVal.paramsIdVal),
    WishListController.removeFromWishList
  );

export default wishListRouter;
