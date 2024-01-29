import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import { uploadSingleFile } from "../../services/fileUploads/multer.js";
import  * as BrandController from "./brand.controller.js";
import * as JoiVal from "./brand.validation.js";

const brandRouter = Router();

brandRouter
  .route("/")
  .post(
    uploadSingleFile("logo"),
    validation(JoiVal.addBrandVal),
    BrandController.addBrand
  )
  .get(BrandController.getAllBrand);

brandRouter
  .route("/:id")
  .get(validation(JoiVal.paramsIdVal), BrandController.OneBrand)
  .put(
    uploadSingleFile("logo"),
    validation(JoiVal.updateBrandVal),
    BrandController.updateBrand
  )
  .delete(validation(JoiVal.paramsIdVal), BrandController.deleteBrand);

export default brandRouter;
