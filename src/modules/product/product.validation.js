import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addProductVal = Joi.object({
  title: Joi.string().min(2).max(50).trim().required(),
  description: Joi.string().min(5).max(100).required(),
  price: Joi.number().integer().min(0).required(),
  discount: Joi.number().integer().min(0).optional(),
  quantity: Joi.number().integer().min(1).optional(),

  createdBy: Joi.string().custom(validateObjectId).optional(),
  categoryId: Joi.string().custom(validateObjectId).required(),
  subcategoryId: Joi.string().custom(validateObjectId).required(),
  brandId: Joi.string().custom(validateObjectId).required(),

  imgCover: Joi.array().items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
      })
    ).required(),
  images: Joi.array().items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
      })
    ).required(),
});

const paramsIdVal = Joi.object({
  id: Joi.string().custom(validateObjectId).required(),
});

const updateProductVal = Joi.object({
  id: Joi.string().custom(validateObjectId).required(),

  title: Joi.string().min(2).max(50).trim(),
  description: Joi.string().min(5).max(100),
  price: Joi.number().min(0),
  priceAfterDiscount: Joi.number().min(0).optional(),
  quantity: Joi.number().min(0).optional(),

  createdBy: Joi.string().custom(validateObjectId).optional(),
  categoryId: Joi.string().custom(validateObjectId),
  subcategoryId: Joi.string().custom(validateObjectId),
  brandId: Joi.string().custom(validateObjectId),

  imgCover: Joi.array().items(
    Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
      size: Joi.number().max(5242880).required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
    })
  ),
  images: Joi.array().items(
    Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
      size: Joi.number().max(5242880).required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
    })
  ),
});

export { addProductVal, paramsIdVal, updateProductVal };
