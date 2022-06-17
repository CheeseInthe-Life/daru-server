import { DomainModule } from '@domain/domain';
import { AuthStrategyModule } from '@infra/auth-strategy';
import { KakaoModule } from '@infra/kakao';
import { PersistenceModule } from '@infra/persistence';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthFacade } from '../application/auth.facade';
import { AuthController } from '../presentation/auth/api/auth.controller';

@Module({
  imports: [
    AuthStrategyModule,
    JwtModule,
    PersistenceModule,
    DomainModule,
    KakaoModule,
  ],
  controllers: [AuthController],
  providers: [AuthFacade],
})
export class AuthModule {}
