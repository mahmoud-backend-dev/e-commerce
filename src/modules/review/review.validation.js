import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addReviewVal = Joi.object({
  text: Joi.string().min(2).max(200).trim().required(),
  rate: Joi.number().min(0).max(5).required(),
  productId: Joi.string().hex().length(24).required(),
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateReviewVal = Joi.object({
  text: Joi.string().min(2).max(200).trim(),
  rate: Joi.number().min(0).max(5),
  productId: Joi.string().hex().length(24),
});

export { addReviewVal, paramsIdVal, updateReviewVal };
