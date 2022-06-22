import { PersistenceModule } from '@infra/persistence';
import { Module, Provider } from '@nestjs/common';
import { ManagerServiceImpl } from '../service/manager.service';
import { ManagerDIToken } from './manager.token';

const serviceProviders: Provider[] = [
  {
    provide: ManagerDIToken.ManagerService,
    useClass: ManagerServiceImpl,
  },
];

@Module({
  imports: [PersistenceModule],
  providers: [...serviceProviders],
  exports: [...serviceProviders],
})
export class ManagerModule {}
