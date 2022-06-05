import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

const { JWT_ISSUER, JWT_SECRET, JWT_ACCESS_EXPIRE, JWT_REFRESH_EXPIRE } =
  process.env;

export interface jwtConfigInterface {
  access: JwtSignOptions;
  refresh: JwtSignOptions;
}

const baseOptions: JwtSignOptions = {
  issuer: JWT_ISSUER as string,
  secret: JWT_SECRET as string,
};

export default registerAs('jwt', (): jwtConfigInterface => {
  Logger.debug('JwtConfig Loader');

  return {
    access: { ...baseOptions, expiresIn: JWT_ACCESS_EXPIRE as string },
    refresh: { ...baseOptions, expiresIn: JWT_REFRESH_EXPIRE as string },
  };
});
