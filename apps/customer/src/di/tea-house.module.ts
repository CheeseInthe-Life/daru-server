import { DomainModule } from '@domain/domain';
import { PersistenceModule } from '@infra/persistence';
import { Module } from '@nestjs/common';
import { TeaHouseFacade } from '../application/tea-house.facade';
import { TeaHouseController } from '../presentation/tea-house/tea-house.controller';

@Module({
  imports: [PersistenceModule, DomainModule],
  providers: [TeaHouseFacade],
  controllers: [TeaHouseController],
})
export class TeaHouseApplicationModule {}
