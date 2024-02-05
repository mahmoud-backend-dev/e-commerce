import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addBrandVal = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
  categories: 
    Joi.string().custom(validateObjectId).required(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
    size: Joi.number().max(5242880).required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  }).required(),
}).required();

const paramsIdVal = Joi.object({
  id: Joi.string().custom(validateObjectId).required(),
});

const updateBrandVal = Joi.object({
  name: Joi.string().min(2).max(50).trim(),
  id: Joi.string().custom(validateObjectId).required(),

  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
    size: Joi.number().max(5242880).required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  }),
});

export { addBrandVal, paramsIdVal, updateBrandVal };
