export interface IAllFiles {
  message: string;
  files: string[];
}
export interface ISuccess {
  message: string;
}

export interface IFileContent {
  message: string;
  filename: string;
  content: string;
  extension: string;
  uploadedDate: Date;
}
