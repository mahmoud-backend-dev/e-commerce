import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addSubCategoryVal = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
  category: Joi.string().custom(validateObjectId).required(),
  image: Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().valid("image/jpeg", "image/png","image/JPG").required(),
      size: Joi.number().max(5242880).required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
    }).required()
});

const paramsIdVal = Joi.object({
  id: Joi.string().custom(validateObjectId).required(),
  category: Joi.string().custom(validateObjectId),

});

const updateSubCategoryVal = Joi.object({
  id: Joi.string().custom(validateObjectId).required(),

  name: Joi.string().min(2).max(50).trim(),
  category: Joi.string().custom(validateObjectId),
});

export { addSubCategoryVal, paramsIdVal, updateSubCategoryVal };
