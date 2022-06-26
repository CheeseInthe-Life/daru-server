import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ulid } from 'ulid';
import {
  FileCopy,
  FileService,
} from '@domain/domain/interface/service/file.service';

const { AWS_BUCKET_REGION, AWS_BUCKET_NAME } = process.env;
@Injectable()
export class S3Service implements FileService {
  constructor() {
    AWS.config.update({
      region: AWS_BUCKET_REGION as string,
    });
  }

  async uploadFile({
    file,
    path,
  }: {
    file: Express.Multer.File;
    path: string;
  }): Promise<FileCopy> {
    const s3 = new AWS.S3();
    const filePathAndName = this.createFileName(path, file.mimetype);
    const uploadResult = await s3
      .upload({
        Bucket: AWS_BUCKET_NAME as string,
        ContentType: file.mimetype,
        Body: file.buffer,
        Key: filePathAndName,
      })
      .promise();

    return {
      key: uploadResult.Key,
      path: filePathAndName,
      fullUrl: uploadResult.Location,
    };
  }

  private createFileName(path: string, type: string): string {
    return `${path}/${ulid()}.${type}`;
  }
}
