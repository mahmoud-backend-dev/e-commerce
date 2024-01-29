import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addSubCategoryVal = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
  categoryId: Joi.string().custom(validateObjectId).required(),
});

const paramsIdVal = Joi.object({
  id: Joi.string().custom(validateObjectId).required(),
});

const updateSubCategoryVal = Joi.object({
  id: Joi.string().custom(validateObjectId).required(),

  name: Joi.string().min(2).max(50).trim(),
  categoryId: Joi.string().hex().length(24),
});

export { addSubCategoryVal, paramsIdVal, updateSubCategoryVal };
