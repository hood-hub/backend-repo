const multer = require("multer");
import express from "express";
import UploadController from "../controllers/upload";

const router = express.Router();
const upload = multer();

const uploadController = new UploadController();

router.post("/single-file", upload.single("file"), [
  uploadController.uploadSingleFile,
]);

router.post("/multiple-files", upload.array("files", 20), [
  uploadController.uploadMultipleFiles,
]);

export default router;
