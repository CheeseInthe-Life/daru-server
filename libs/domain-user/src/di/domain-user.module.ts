import { PersistenceModule } from '@infra/persistence';
import { UserRepositoryImpl } from '@infra/persistence/repository/user.repository';
import { Module, Provider } from '@nestjs/common';
import { DomainUserService } from '../service/domain-user.service';
import { UserDIToken } from './domain-user.token';

const persistenceProviders: Provider[] = [
  {
    provide: UserDIToken.UserRepository,
    useClass: UserRepositoryImpl,
  },
];

@Module({
  imports: [PersistenceModule],
  providers: [DomainUserService, ...persistenceProviders],
  exports: [DomainUserService],
})
export class DomainUserModule {}
