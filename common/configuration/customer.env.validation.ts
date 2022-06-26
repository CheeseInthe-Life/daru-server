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
  CUSTOMER_NODE_ENV: Environment;

  @IsNumber()
  CUSTOMER_PORT: number;

  @IsString()
  CUSTOMER_JWT_ISSUER: string;

  @IsString()
  CUSTOMER_JWT_SECRET: string;

  @IsString()
  CUSTOMER_JWT_ACCESS_EXPIRE: string;

  @IsString()
  CUSTOMER_JWT_REFRESH_EXPIRE: string;

  @IsString()
  KAKAO_CLIENT_KEY: string;

  @IsString()
  KAKAO_CLIENT_SECRET_KEY: string;

  @IsString()
  KAKAO_REDIRECT_URL: string;

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
