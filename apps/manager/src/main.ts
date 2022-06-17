import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './di/app.module';
import { HttpExceptionFilter } from './presentation/common/filter/exception-filter';

const { MANAGER_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(MANAGER_PORT ?? 9999);
}
bootstrap();
