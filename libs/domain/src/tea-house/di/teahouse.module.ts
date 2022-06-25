import { PersistenceModule } from '@infra/persistence';
import { Module } from '@nestjs/common';
import { TeaHouseService } from '../service/tea-house.service';
import { TeaHouseDIToken } from './tea-house.token';

const serviceProviders = [
  {
    provide: TeaHouseDIToken.TeaHouseService,
    useClass: TeaHouseService,
  },
];

@Module({
  imports: [PersistenceModule],
  providers: [...serviceProviders],
  exports: [...serviceProviders],
})
export class TeaHouseModule {}
