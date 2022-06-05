import { PersistenceModule } from '@infra/persistence';
import { Module } from '@nestjs/common';
import { DomainUserService } from '../service/domain-user.service';

@Module({
  imports: [PersistenceModule],
  providers: [DomainUserService],
  exports: [DomainUserService],
})
export class DomainUserModule {}
