import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import * as userValidation from "./user.validation.js";
import * as userController from "./user.controller.js";
import { allowTo, protectedRoute } from "../auth/auth.controller.js";

const userRouter = Router();

userRouter
  .get("/allUsers", userController.allUsers)
  .get("/one_user", userController.Oneuser)

  .post(
    "/add_user",
    protectedRoute,
    allowTo("admin"),
    validation(userValidation.addUserVal),
    userController.adduser
  )
  .put(
    "/update_user/:id",
    protectedRoute,
    allowTo("admin"),
    validation(userValidation.updateUserVal),
    userController.updateuser
  )
  .delete(
    "/delete_user/:id",
    protectedRoute,
    allowTo("admin"),
    validation(userValidation.paramsIdVal),
    userController.deleteuser
  );

export default userRouter;
