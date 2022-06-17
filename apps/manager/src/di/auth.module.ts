import { DomainModule } from '@domain/domain';
import { PersistenceModule } from '@infra/persistence';
import { Module } from '@nestjs/common';
import { AuthFacade } from '../application/auth.facade';
import { AuthController } from '../presentation/auth/api/auth.controller';

@Module({
  imports: [DomainModule, PersistenceModule],
  providers: [AuthFacade],
  controllers: [AuthController],
})
export class AuthModule {}
