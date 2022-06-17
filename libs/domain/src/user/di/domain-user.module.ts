import { PersistenceModule } from '@infra/persistence';
import { Module, Provider } from '@nestjs/common';
import { UserServiceImpl } from '../service/domain-user.service';
import { UserDIToken } from './domain-user.token';

const serviceProviders: Provider[] = [
  {
    provide: UserDIToken.UserService,
    useClass: UserServiceImpl,
  },
];

@Module({
  imports: [PersistenceModule],
  providers: [...serviceProviders],
  exports: [...serviceProviders],
})
export class DomainUserModule {}
