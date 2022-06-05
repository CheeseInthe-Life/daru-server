import { PersistenceModule } from '@infra/persistence';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { KakaoStrategy } from './kakao-strategy.service';

@Module({
  imports: [PersistenceModule, JwtModule],
  providers: [KakaoStrategy],
  exports: [KakaoStrategy],
})
export class AuthStrategyModule {}
