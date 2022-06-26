import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsString, IsEnum, IsNumber, validateSync } from 'class-validator';

enum Environment {
  LOCAL = 'local',
  DEVELOP = 'dev',
  STAGING = 'staging',
  PRODUCTION = 'prod',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  MANAGER_NODE_ENV: Environment;

  @IsNumber()
  MANAGER_PORT: number;

  @IsString()
  MANAGER_JWT_ISSUER: string;

  @IsString()
  MANAGER_JWT_SECRET: string;

  @IsString()
  MANAGER_JWT_ACCESS_EXPIRE: string;

  @IsString()
  MANAGER_JWT_REFRESH_EXPIRE: string;

  @IsString()
  DARU_DATABASE_HOST: string;

  @IsNumber()
  DARU_DATABASE_PORT: number;

  @IsString()
  DARU_DATABASE_USERNAME: string;

  @IsString()
  DARU_DATABASE_PASSWORD: string;

  @IsString()
  DARU_DATABASE_NAME: string;

  @IsString()
  NAVER_ACCESS_KEY: string;

  @IsString()
  NAVER_SECRET: string;

  @IsString()
  NAVER_SMS_SERVICE_ID: string;

  @IsString()
  NAVER_SMS_SERVICE_SECRET: string;

  @IsString()
  NAVER_SMS_FROM_AUTH_NUMBER: string;

  @IsString()
  AWS_ACCESS_KEY: string;

  @IsString()
  AWS_SECRET_KEY: string;

  @IsString()
  AWS_BUCKET_REGION: string;

  @IsString()
  AWS_BUCKET_NAME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    Logger.log('환경 변수를 설정해 주세요.');
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
