import { Module } from '@nestjs/common';
import { ManagerModule } from './manager/di/manager.module';
import { UserModule } from './user/di/user.module';

@Module({
  imports: [UserModule, ManagerModule],
  providers: [],
  exports: [UserModule, ManagerModule],
})
export class DomainModule {}
