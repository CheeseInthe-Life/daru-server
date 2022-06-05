import { DomainUserModule } from '@domain/domain-user';
import { AuthStrategyModule } from '@infra/auth-strategy';
import { PersistenceModule } from '@infra/persistence';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthFacade } from '../application/auth.facade';
import { AuthController } from '../presentation/auth/api/auth.controller';

@Module({
  imports: [AuthStrategyModule, JwtModule, PersistenceModule, DomainUserModule],
  controllers: [AuthController],
  providers: [AuthFacade],
})
export class AuthModule {}
