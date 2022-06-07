import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './di/app.module';
import { ValidationPipe } from '@nestjs/common';

const { CUSTOMER_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(CUSTOMER_PORT);
}
bootstrap();
