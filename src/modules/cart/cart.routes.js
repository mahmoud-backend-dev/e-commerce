import { Router } from "express";
import * as CartController from "./cart.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";
import * as JoiVal from "./cart.validation.js";

const CartRouter = Router();

CartRouter
  .route("/")
  .post(
    protectedRoute,
    allowTo("user"),
    validation(JoiVal.addToCartVal),
    CartController.addCart
  )
  .get(protectedRoute, allowTo("user"), CartController.getLogedUserCart)
  .delete(protectedRoute, allowTo("user"), CartController.clearUserCart);


CartRouter
  .route("/:id")
  .delete(
    protectedRoute,
    allowTo("user", "admin"),
    validation(JoiVal.paramsIdVal),
    CartController.removeItemFromCart
  )
  .put(
    protectedRoute,
    allowTo("user"),
    validation(JoiVal.updateQuantity),
    CartController.updateQuantity
  );

export default CartRouter;
