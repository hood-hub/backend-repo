import express from "express";
import RequestBodyMiddleware from "../middleware/requestBody";
import ValidateLogin from "../middleware/auth";
import GroupValidator from "../validators/group";
import GroupController from "../controllers/group";

const router = express.Router();
const groupController = new GroupController();

router.post("/", [
  RequestBodyMiddleware.validate(GroupValidator.createGroup()),
  ValidateLogin,
  groupController.createGroup,
]);

router.put("/update/:id", [
  RequestBodyMiddleware.validate(GroupValidator.updateGroup()),
  ValidateLogin,
  groupController.update,
]);

router.put("/request-to-join-group/:id", [
  ValidateLogin,
  groupController.requestToJoinPrivateGroup,
]);

router.put("/approve-request-to-join-group/:id", [
  ValidateLogin,
  groupController.approveRequestToJoinPrivateGroup,
]);

router.put("/add-members/:id", [
  RequestBodyMiddleware.validate(GroupValidator.addMembers()),
  ValidateLogin,
  groupController.addGroupMembers,
]);

router.put("/add-admin/:id", [
  RequestBodyMiddleware.validate(GroupValidator.addAdmin()),
  ValidateLogin,
  groupController.addAdmin,
]);

router.delete("/delete-group/:id", [
  ValidateLogin,
  groupController.deleteGroup,
]);

router.get("/get-group/:id", [ValidateLogin, groupController.getGroupById]);

router.get("/get-group-members/:id", [
  ValidateLogin,
  groupController.getGroupMembers,
]);

router.get("/", [ValidateLogin, groupController.getAllGroups]);

router.get("/get-group-requests/:id", [
  ValidateLogin,
  groupController.getGroupRequests,
]);

export default router;
