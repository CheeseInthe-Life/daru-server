import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NotificationServiceImpl } from './naver.service';

@Module({
  imports: [HttpModule],
  providers: [NotificationServiceImpl],
  exports: [NotificationServiceImpl],
})
export class NaverModule {}
