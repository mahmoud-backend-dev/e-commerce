import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import * as userValidation from "./user.validation.js";
import * as userController from "./user.controller.js";

const userRouter = Router();

userRouter
  .get('/allUsers',userController.allUsers)
  .get('/one_user',userController.Oneuser)

  .post("/add_user", validation(userValidation.addUserVal),
   userController.adduser)
  .put(
    "/update_user/:id",
    validation(userValidation.updateUserVal),
    userController.updateuser
  )
  .delete("/delete_user/:id", 
  validation(userValidation.paramsIdVal), userController.deleteuser)


export default userRouter;
