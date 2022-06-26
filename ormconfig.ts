import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

import register from './common/configuration/database.config';

// Check typeORM documentation for more information.
export default {
  ...register(),
  entities: [
    join(__dirname, './libs/persistence/src/entity/*.entity{.ts,.js}'),
  ],
  migrations: [
    join(__dirname, './libs/persistence/src/migration/*.migration{.ts,.js}'),
  ],
  cli: {
    entitiesDir: join(__dirname, './libs/persistence/src/entity'),
    migrationsDir: join(__dirname, './libs/persistence/src/migration'),
  },
} as ConnectionOptions;
