import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './di/app.module';

const { CUSTOMER_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(CUSTOMER_PORT);
}
bootstrap();
