import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addCouponVal = Joi.object({
  // createdBy: Joi.string().hex().length(24).required(),

  code: Joi.string().min(2).max(80).trim().required(),
  discount: Joi.number().min(500).max(1000).required(),
  expires: Joi.date().required(),
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateCouponVal = Joi.object({
  id: Joi.string().hex().length(24).required(),

  code: Joi.string().min(2).max(80).trim(),
  discount: Joi.number().min(500).max(1000),
  expires: Joi.date(),
});

export { addCouponVal, paramsIdVal, updateCouponVal };
