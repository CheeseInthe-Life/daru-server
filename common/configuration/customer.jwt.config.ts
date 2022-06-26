import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

const {
  CUSTOMER_JWT_ISSUER,
  CUSTOMER_JWT_SECRET,
  CUSTOMER_JWT_ACCESS_EXPIRE,
  CUSTOMER_JWT_REFRESH_EXPIRE,
} = process.env;

export interface jwtConfigInterface {
  access: JwtSignOptions;
  refresh: JwtSignOptions;
}

const baseOptions: JwtSignOptions = {
  issuer: CUSTOMER_JWT_ISSUER as string,
  secret: CUSTOMER_JWT_SECRET as string,
};

export default registerAs('jwt', (): jwtConfigInterface => {
  Logger.debug('JwtConfig Loader');

  return {
    access: { ...baseOptions, expiresIn: CUSTOMER_JWT_ACCESS_EXPIRE as string },
    refresh: {
      ...baseOptions,
      expiresIn: CUSTOMER_JWT_REFRESH_EXPIRE as string,
    },
  };
});
