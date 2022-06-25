import { TeaHouseDIToken } from '@domain/domain/tea-house/di/tea-house.token';
import { TeaHouseService } from '@domain/domain/tea-house/service/tea-house.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TeaHouseFacade {
  constructor(
    @Inject(TeaHouseDIToken.TeaHouseService)
    private readonly teaHouseService: TeaHouseService,
  ) {}
  async retrieveTeaHouseList() {
    return await this.teaHouseService.retrieveTeaHouseList();
  }
}
