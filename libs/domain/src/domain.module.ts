import { Module } from '@nestjs/common';
import { DomainManagerModule } from './manager/di/domain-manager.module';
import { DomainUserModule } from './user/di/domain-user.module';

@Module({
  imports: [DomainUserModule, DomainManagerModule],
  providers: [],
  exports: [DomainUserModule, DomainManagerModule],
})
export class DomainModule {}
