import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';
import { Logger } from '@nestjs/common';

const {
  DARU_DATABASE_HOST,
  DARU_DATABASE_PORT,
  DARU_DATABASE_USERNAME,
  DARU_DATABASE_PASSWORD,
  DARU_DATABASE_NAME,
} = process.env;

const baseOption: ConnectionOptions = {
  type: 'mysql',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [join(__dirname, '../../../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../../../**/*-migration{.ts,.js}')],
};

export default registerAs('database', (): ConnectionOptions => {
  Logger.debug(
    `database.config.ts EntityPath: ${join(
      __dirname,
      '../../../**/*.entity{.ts,.js}',
    )}`,
  );
  Logger.debug(
    `database.config.ts MigrationPath: ${join(
      __dirname,
      '../../../**/*-migration.{.ts,.js}',
    )}`,
  );

  return {
    ...baseOption,
    host: DARU_DATABASE_HOST ?? '127.0.0.1',
    port: +DARU_DATABASE_PORT ?? 3306,
    username: DARU_DATABASE_USERNAME ?? 'admin',
    password: DARU_DATABASE_PASSWORD,
    database: DARU_DATABASE_NAME,
    migrationsRun: true,
    synchronize: false,
    logging: true,
  };
});
