import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addToWishListVal = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateWishListVal = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});

export { addToWishListVal, paramsIdVal, updateWishListVal };
