import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addAddressVal = Joi.object({
  street:Joi.string().trim().required(),
  phone:Joi.string().trim().required(),
  city:Joi.string().trim().required(),
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateAddress = Joi.object({
  id: Joi.string().hex().length(24).required(),

  street:Joi.string().trim(),
  phone:Joi.string().trim(),
  city:Joi.string().trim(),
});

export { addAddressVal, paramsIdVal, updateAddress };
