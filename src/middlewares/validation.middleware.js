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
    }else if(req.files){
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
    const { error } = schema.validate(filter, { abortEarly: false });
    if (!error) next();
    else {
      let errorList = [];
      error.details.forEach((ele) => {
        errorList.push(ele.message);
      });
      next(new Error("Errors is: ", errorList, { cause: 400 }));
    }
  };
};

export const validateObjectId = (value, helper) => {
  Types.ObjectId.isValid(value) ? true : helper.message("Invalid Object ID");
};
