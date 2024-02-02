import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import { uploadSingleFile } from "../../services/fileUploads/multer.js";
import  * as BrandController from "./brand.controller.js";
import * as JoiVal from "./brand.validation.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";

const brandRouter = Router();

brandRouter
  .route("/")
  .post(
    protectedRoute,
    allowTo('admin'),
    uploadSingleFile("logo"),
    validation(JoiVal.addBrandVal),
    BrandController.addBrand
  )
  .get(BrandController.getAllBrand);

brandRouter
  .route("/:id")
  .get(validation(JoiVal.paramsIdVal), BrandController.OneBrand)
  .put(
    protectedRoute,
    allowTo('admin'),
    uploadSingleFile("logo"),
    validation(JoiVal.updateBrandVal),
    BrandController.updateBrand
  )
  .delete(validation(JoiVal.paramsIdVal), BrandController.deleteBrand);

export default brandRouter;
