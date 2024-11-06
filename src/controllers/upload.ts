import { Response } from "express";
import UploadService from "../services/upload";
import ErrorMiddleware from "../middleware/error";

export default class UploadController {
  uploadSingleFile = async (req: any, res: Response): Promise<any> => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Kindly select a file.",
        });
      }
      console.log(req.file);

      const singleFile = await UploadService.uploadSingleFileToAzure(req.file);

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully!",
        data: singleFile,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  };

  uploadMultipleFiles = async (req: any, res: Response): Promise<any> => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Kindly select files.",
        });
      }

      const multipleFiles = await UploadService.uploadMultipleFilesToAzure(
        req.files
      );

      return res.status(200).json({
        success: true,
        message: "Files uploaded successfully!",
        data: multipleFiles,
      });
    } catch (ex) {
      ErrorMiddleware.serverError(res, ex);
    }
  };
}
