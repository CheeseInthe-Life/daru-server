import 'dotenv/config';
import * as AWS from 'aws-sdk';
import { Module, Provider } from '@nestjs/common';
import { S3Service } from './s3.service';
import { FileDIToken } from '@domain/domain/interface/di/file.service.token';

const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;

const serviceProviders: Provider[] = [
  {
    provide: FileDIToken.FileService,
    useClass: S3Service,
  },
];

@Module({
  providers: [...serviceProviders],
  exports: [...serviceProviders],
})
export class AwsModule {
  constructor() {
    AWS.config.credentials = new AWS.Credentials({
      accessKeyId: AWS_ACCESS_KEY as string,
      secretAccessKey: AWS_SECRET_KEY as string,
    });
  }
}
