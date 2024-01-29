import Joi from "joi";

const signUpVal = Joi.object({
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
}).required;

const activeAccountVal = Joi.object({
  token: Joi.string().required(),
}).required;

const loginVal = Joi.object({
  email: Joi.string()
    .email({
      maxDomainSegments: 2,
      tlds: { allow: ["com", "pro"] },
    })
    .lowercase()

    .required(),
  password: Joi.string().required(),
}).required;

const forgetPassVal = Joi.object({
  email: Joi.string()
    .email({
      maxDomainSegments: 2,
      tlds: { allow: ["com", "pro"] },
    })
    .lowercase()

    .required(),
}).required;

const resetPassVal = Joi.object({
  password: Joi.string().required(),
  confirmPassword: Joi.valid(Joi.ref("password")),
  code: Joi.string().length(5).required(),
}).required;

export { signUpVal, activeAccountVal, loginVal, forgetPassVal, resetPassVal };
