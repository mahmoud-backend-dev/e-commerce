import { Router } from "express";
import * as SubCategoryController from "./subCategory.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as JoiVal from "./subCategory.validation.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";
import { uploadSingleFile } from "../../services/fileUploads/multer.js";

const SubCategoryRouter = Router({mergeParams:true});

SubCategoryRouter
  .route("/")
  .post(
    protectedRoute,
    allowTo('admin'),
    uploadSingleFile("img-Subcategory"),
    validation(JoiVal.addSubCategoryVal),
    SubCategoryController.addSubCategory
  )
  .get(SubCategoryController.allSubCategories);

SubCategoryRouter
  .route("/:id")
  .get(validation(JoiVal.paramsIdVal), SubCategoryController.OneSubCategory)
  .put(
    validation(JoiVal.updateSubCategoryVal),
    SubCategoryController.updateSubCategory
  )
  .delete(
    validation(JoiVal.paramsIdVal),
    SubCategoryController.deleteSubCategory
  );

export default SubCategoryRouter;
