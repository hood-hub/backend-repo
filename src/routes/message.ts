import express from "express";
import RequestBodyMiddleware from "../middleware/requestBody";
import ValidateLogin from "../middleware/auth";
import GroupValidator from "../validators/group";
import MessageController from "../controllers/message";
import MessageValidator from "../validators/message";

const router = express.Router();
const messageController = new MessageController();

router.post("/", [
  RequestBodyMiddleware.validate(MessageValidator.createMessage()),
  ValidateLogin,
  messageController.createMessage,
]);

router.post("/direct-message", [
  RequestBodyMiddleware.validate(MessageValidator.createDirectMessage()),
  ValidateLogin,
  messageController.createDirectMessage,
]);

// router.put("/update/:id", [
//   RequestBodyMiddleware.validate(GroupValidator.updateGroup()),
//   ValidateLogin,
//   messageController.update,
// ]);

router.get("/get-message/:id", [
  ValidateLogin,
  messageController.getMessageById,
]);

router.get("/get-by-group/:id", [ValidateLogin, messageController.getByGroup]);

router.get("/get-by-direct-message/:id", [
  ValidateLogin,
  messageController.getByDirectMessage,
]);

router.get("/get-my-direct-messages/", [
  ValidateLogin,
  messageController.getDirectMessagesForUser,
]);

export default router;
