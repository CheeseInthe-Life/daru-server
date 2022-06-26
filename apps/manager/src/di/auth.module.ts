import { DomainModule } from '@domain/domain';
import { AwsModule } from '@infra/aws';
import { NaverModule } from '@infra/naver';
import { PersistenceModule } from '@infra/persistence';
import { Module } from '@nestjs/common';
import { AuthFacade } from '../application/auth.facade';
import { AuthController } from '../presentation/auth/api/auth.controller';

@Module({
  imports: [DomainModule, PersistenceModule, AwsModule, NaverModule],
  providers: [AuthFacade],
  controllers: [AuthController],
})
export class AuthApplicationModule {}
