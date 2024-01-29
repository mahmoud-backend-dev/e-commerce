import Joi from "joi";
import { validateObjectId } from "../../middlewares/validation.middleware.js";

const addUserVal = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .email({
      maxDomainSegments: 2,
      tlds: { allow: ["com", "pro"] },
    })
    .lowercase()

    .required(),
  password: Joi.string().required(),
  confirmPassword: Joi.valid(Joi.ref("password")),
  age: Joi.number().min(10),
  role: Joi.string().valid("user", "admin"),
}).required();

const updateUserVal = Joi.object({
  id: Joi.string().custom(validateObjectId).required(),
  username: Joi.string(),
  email: Joi.string()
    .email({
      maxDomainSegments: 2,
      tlds: { allow: ["com", "pro"] },
    })
    .lowercase(),
  password: Joi.string(),
  confirmPassword: Joi.valid(Joi.ref("password")),
  age: Joi.number().min(10),
  role: Joi.string().valid("user", "admin"),
}).required;

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export { addUserVal, updateUserVal, paramsIdVal };
