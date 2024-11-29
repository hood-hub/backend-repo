import express from "express";
import RequestBodyMiddleware from "../middleware/requestBody";
import UserValidator from "../validators/user";
import UserController from "../controllers/user";
import passport from "passport";
import ValidateLogin from "../middleware/auth";

const router = express.Router();
const userController = new UserController();

router.post("/", [
  RequestBodyMiddleware.validate(UserValidator.signup()),
  userController.signup,
]);

router.post("/verify", [userController.verifyUser]);

router.post("/forgot-password", [userController.forgotPassword]);

router.post("/reset-password", [
  RequestBodyMiddleware.validate(UserValidator.resetPassword()),
  userController.resetPassword,
]);

router.post("/resend-token", [userController.resendVerificationToken]);

router.put("/update-profile/", [
  RequestBodyMiddleware.validate(UserValidator.updateProfile()),
  ValidateLogin,
  userController.updateProfile,
]);

router.put("/update-emergency-contact/", [
  RequestBodyMiddleware.validate(UserValidator.updateEmergencyContact()),
  ValidateLogin,
  userController.updateEmergencyContact,
]);

router.put("/change-password/", [
  RequestBodyMiddleware.validate(UserValidator.changePassword()),
  ValidateLogin,
  userController.changePassword,
]);

router.put("/onboard/:id", [
  RequestBodyMiddleware.validate(UserValidator.onboard()),
  userController.onboard,
]);

router.post("/login", [
  RequestBodyMiddleware.validate(UserValidator.login()),
  userController.login,
]);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // successRedirect: "",
    session: false,
    failureRedirect: "",
  }),
  userController.googleLogin
);

router.get("/get-all", [ValidateLogin, userController.getAllUsers]);

router.get("/get-one-user/:id", [userController.getOneUser]);

router.get("/get-nearby-users/", [
  ValidateLogin,
  userController.getNearbyUsers,
]);

router.delete("/delete-permanently/:id", [
  ValidateLogin,
  userController.getOneUser,
]);

/* ADMINS */

router.post("/admin", [
  RequestBodyMiddleware.validate(UserValidator.signupAdmin()),
  userController.signupAdmin,
]);

router.put("/admin/deactivate-admin/:id", [
  ValidateLogin,
  userController.deactivateAdmin,
]);

router.get("/admin/get-all", [ValidateLogin, userController.getAllAdmins]);

router.get("/logout", [ValidateLogin, userController.logout]);

export default router;
