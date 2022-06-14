import { Module } from '@nestjs/common';
import { AppController } from '../presentation/root/app/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
