import { BlobServiceClient } from "@azure/storage-blob";
import path from "path";
import { IFile } from "../interfaces/upload";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_CONTAINER_NAME;
const storageAccountName = process.env.AZURE_STORAGE_RESOURCE_NAME;
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

class UploadService {
  constructor() {}

  uploadSingleFileToAzure = async (file: IFile) => {
    const blobName = `${
      file.originalname.split(" ").join("").split(".")[0]
    }-${Date.now().toString()}-${path.extname(file.originalname)}`;

    const uploadBlobResponse = await this.createBlobInContainer(file, blobName);
    if (uploadBlobResponse._response.status !== 201) {
      return `Error uploading document`;
    }

    return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}`;
  };

  uploadMultipleFilesToAzure = async (files: IFile[]) => {
    let fileUrls: string[] = [];

    for (const file of files) {
      const uploadOne = await this.uploadSingleFileToAzure(file);
      fileUrls.push(uploadOne);
    }
    return fileUrls;
  };

  createBlobInContainer = async (file: IFile, blobName: string) => {
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(blobName);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };

    // upload file
    const uploadResponse = await blobClient.uploadData(file.buffer, options);
    return uploadResponse;
  };
}

export default new UploadService();
