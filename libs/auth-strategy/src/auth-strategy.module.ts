import { Module } from '@nestjs/common';
import { KakaoStrategyService } from './kakao-strategy.service';

@Module({
  providers: [KakaoStrategyService],
  exports: [KakaoStrategyService],
})
export class AuthStrategyModule {}
