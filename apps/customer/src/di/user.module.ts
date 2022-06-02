import { DomainUserModule } from '@domain/domain-user';
import { Module } from '@nestjs/common';
import { UserFacade } from '../application/user.facade';
import { UserController } from '../presentation/user/api/user.controller';

@Module({
  imports: [DomainUserModule],
  providers: [UserFacade],
  controllers: [UserController],
})
export class UserModule {}
