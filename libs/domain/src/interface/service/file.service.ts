export interface FileService {
  uploadFile(params: {
    file: Express.Multer.File;
    path: string;
  }): Promise<FileCopy>;
}

export type FileCopy = {
  key: string;
  path: string;
  fullUrl: string;
};
