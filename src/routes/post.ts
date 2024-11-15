import express from "express";
import RequestBodyMiddleware from "../middleware/requestBody";
import ValidateLogin from "../middleware/auth";
import PostValidator from "../validators/post";
import PostController from "../controllers/post";

const router = express.Router();
const postController = new PostController();

router.post("/", [
  RequestBodyMiddleware.validate(PostValidator.createPost()),
  ValidateLogin,
  postController.createPost,
]);

router.put("/update/:id", [
  RequestBodyMiddleware.validate(PostValidator.updatePost()),
  ValidateLogin,
  postController.update,
]);

router.delete("/delete-post/:id", [ValidateLogin, postController.deletePost]);

router.post("/like/:id", [ValidateLogin, postController.likePost]);

// router.delete("/remove-like/:id", [
//   ValidateLogin,
//   postController.removeLikeFromPost,
// ]);

router.post("/comment/:id", [
  RequestBodyMiddleware.validate(PostValidator.commentOnPost()),
  ValidateLogin,
  postController.commentOnPost,
]);

router.put("/update-comment/:id", [
  RequestBodyMiddleware.validate(PostValidator.commentOnPost()),
  ValidateLogin,
  postController.updateComment,
]);

router.delete("/delete-comment/:id", [
  ValidateLogin,
  postController.deleteComment,
]);

router.get("/get-comments-by-post/:id", [
  ValidateLogin,
  postController.getCommentsByPost,
]);

router.post("/create-incident", [
  RequestBodyMiddleware.validate(PostValidator.createPost()),
  ValidateLogin,
  postController.createIncident,
]);

router.get("/get-all-incidents", [
  ValidateLogin,
  postController.getAllIncidents,
]);

router.get("/get-post/:id", [ValidateLogin, postController.getPostById]);

router.get("/get-by-user", [ValidateLogin, postController.getByUser]);

router.get("/get-trending", [ValidateLogin, postController.getTrending]);

router.get("/get-by-user-address", [
  ValidateLogin,
  postController.getByUserAddress,
]);

router.get("/get-flagged", [ValidateLogin, postController.getFlaggedPosts]);

router.put("/resolve-flagged/:id", [
  ValidateLogin,
  postController.resolveFlaggedPost,
]);

router.put("/remove-flagged/:id", [
  ValidateLogin,
  postController.removeFlaggedPost,
]);

router.get("/get-all", [ValidateLogin, postController.getAll]);

export default router;
