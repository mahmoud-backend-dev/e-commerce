import Joi from "joi";

const addProductVal = Joi.object({
  title: Joi.string().min(2).max(50).trim().required(),
  description: Joi.string().min(5).max(100).required(),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().min(0).optional(),
  quantity: Joi.number().min(0).optional(),

  createdBy: Joi.string().hex().length(24).optional(),
  categoryId: Joi.string().hex().length(24).required(),
  subcategoryId: Joi.string().hex().length(24).required(),
  brandId: Joi.string().hex().length(24).required(),

  imgCover: Joi.array()
    .items(
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
    )
    .required(),
  images: Joi.array()
    .items(
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
    )
    .required(),
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateProductVal = Joi.object({
  id: Joi.string().hex().length(24).required(),

  title: Joi.string().min(2).max(50).trim(),
  description: Joi.string().min(5).max(100),
  price: Joi.number().min(0),
  priceAfterDiscount: Joi.number().min(0).optional(),
  quantity: Joi.number().min(0).optional(),

  createdBy: Joi.string().hex().length(24).optional(),
  categoryId: Joi.string().hex().length(24),
  subcategoryId: Joi.string().hex().length(24),
  brandId: Joi.string().hex().length(24),

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
