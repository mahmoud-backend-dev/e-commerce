import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addToCartVal = Joi.object({
  productId: Joi.string().custom(validateObjectId).required(),
  // quantity:Joi.number(),
  // will convert it to string then concate the price , not calculate it>> to solve it
  quantity:Joi.number().integer().options({convert:false}),
  // in postman "quantity":12
});

const paramsIdVal = Joi.object({
  id: Joi.string().custom(validateObjectId).required(),
});

const updateQuantity = Joi.object({
  id: Joi.string().custom(validateObjectId).required(),

  quantity:Joi.number().integer().options({convert:false}).required()
});

export { addToCartVal, paramsIdVal, updateQuantity };
