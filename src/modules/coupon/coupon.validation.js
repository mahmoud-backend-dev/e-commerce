import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addCouponVal = Joi.object({
  // createdBy: Joi.string().hex().length(24).required(),

  code: Joi.number().integer().min(1).max(8),
  discount: Joi.number().min(5).max(80).required(),
  expires: Joi.date().greater(Date.now()).required(),
}).required();

const paramsIdVal = Joi.object({
  code: Joi.string().length(8).required(),
}).required();

const updateCouponVal = Joi.object({
  code: Joi.string().length(8).required(),

  discount: Joi.number().integer().min(5).max(80),
  expires: Joi.date().greater(Date.now()),
}).required();

export { addCouponVal, paramsIdVal, updateCouponVal };
