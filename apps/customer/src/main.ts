import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './di/app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './presentation/common/filter/exception-filter';
import { swaggerLoader } from './presentation/documentation/swagger';

const { CUSTOMER_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  swaggerLoader(app);
  await app.listen(CUSTOMER_PORT);
}
bootstrap();
