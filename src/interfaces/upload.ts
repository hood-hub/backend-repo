export interface IFile {
  originalname: string;
  fieldname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
