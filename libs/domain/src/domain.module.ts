import { Module } from '@nestjs/common';
import { ManagerModule } from './manager/di/manager.module';
import { TeaHouseModule } from './tea-house/di/teahouse.module';
import { UserModule } from './user/di/user.module';

@Module({
  imports: [UserModule, ManagerModule, TeaHouseModule],
  providers: [],
  exports: [UserModule, ManagerModule, TeaHouseModule],
})
export class DomainModule {}
