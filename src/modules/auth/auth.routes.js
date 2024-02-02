import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import * as authValidation from "./auth.validation.js";
import * as authController from "./auth.controller.js";

const authRouter = Router();

authRouter
  .post("/signUp", validation(authValidation.signUpVal), authController.signUp)
  .get(
    "/acctivate_account/:emailToken",
    validation(authValidation.activeAccountVal),
    authController.activeAccount
  )
  .post("/login", validation(authValidation.loginVal), authController.logIn)
  .patch(
    "/forget-Password",
    validation(authValidation.forgetPassVal),
    authController.forgetPass
  )
  .patch(
    "/reset-Password",
    authController.protectedRoute,
    validation(authValidation.resetPassVal),
    authController.resetPass
  );

export default authRouter;
