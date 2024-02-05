import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import * as ProductController from "./product.controller.js";
import * as JoiVal from "./product.validation.js";
import { uploadFiles } from "../../services/fileUploads/multer.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";

const productRouter = Router();

productRouter
  .route("/")
  .post(
    protectedRoute,
    allowTo("admin"),
    uploadFiles([
      // req.files >> object
      { name: "imgCover", maxCount: 1 }, // array
      { name: "images", maxCount: 10 },
    ]),
    validation(JoiVal.addProductVal),
    ProductController.addProduct
  )
  .get(ProductController.getAllProduct);

productRouter
  .route("/:id")
  .get(validation(JoiVal.paramsIdVal), ProductController.OneProduct)
  .put(
    uploadFiles([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(JoiVal.updateProductVal),
    ProductController.updateProduct
  )
  .delete(
    protectedRoute,
    allowTo("admin"),
    validation(JoiVal.paramsIdVal),
    ProductController.deleteProduct
  );

export default productRouter;
