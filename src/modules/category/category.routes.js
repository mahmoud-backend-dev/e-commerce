import { Router } from "express";
import * as CategoryController from "./category.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as JoiVal from "./category.validation.js";
import { uploadSingleFile } from "../../services/fileUploads/multer.js";
import SubCategoryRouter from "../subCategory/subCategory.routes.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";

const categoryRouter = Router();
//Merge param
categoryRouter.use("/:category/subcategories", SubCategoryRouter);

categoryRouter
  .route("/")
  .post(
    protectedRoute,
    allowTo('admin'),
    uploadSingleFile("img-category"),
    validation(JoiVal.addCategoryVal),
    CategoryController.addCategory
  )
  .get(CategoryController.allCategories);

categoryRouter
  .route("/:id")
  .get(validation(JoiVal.paramsIdVal), CategoryController.OneCategory)
  .put(
    protectedRoute,
    allowTo('admin'),
    uploadSingleFile("img-category"),
    validation(JoiVal.updateCategoryVal),
    CategoryController.updateCategory
  )
  .delete(
    protectedRoute,
    allowTo('admin'),
    validation(JoiVal.paramsIdVal),
    CategoryController.deleteCategory
  );

export default categoryRouter;
