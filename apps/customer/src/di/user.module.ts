import { DomainModule } from '@domain/domain';
import { Module } from '@nestjs/common';
import { UserFacade } from '../application/user.facade';
import { UserController } from '../presentation/user/api/user.controller';

@Module({
  imports: [DomainModule],
  providers: [UserFacade],
  controllers: [UserController],
})
export class UserModule {}
