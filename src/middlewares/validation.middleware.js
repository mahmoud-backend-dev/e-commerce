import { Types } from "mongoose";

export const validation = (schema) => {
  return (req, res, next) => {
    let filter = {};
    if (req.file) {
      filter = {
        image: req.file,
        ...req.body,
        ...req.params,
        ...req.query,
      };
    } else if (req.files) {
      filter = {
        ...req.files,
        ...req.body,
        ...req.params,
        ...req.query,
      };
    } else {
      filter = {
        ...req.body,
        ...req.params,
        ...req.query,
      };
    }
    const validationResult = schema.validate(filter, { abortEarly: false });
    if (!validationResult?.error) return next();
    else {
      let errorList = [];
      validationResult.error.details.map((ele) => {
        errorList.push(ele.message);
      });
      return res.status(400).json({ message: "Errors is: ", errorList });
    }
  };
};

export const validateObjectId = (value, helper) => {
  Types.ObjectId.isValid(value) ? true : helper.message("Invalid Object ID");
};
