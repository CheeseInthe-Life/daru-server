import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from 'common/decorator/api-common-response.decorator';
import { TeaHouseFacade } from '../../application/tea-house.facade';
import { CommonResponse } from '../../../../../common/response/common-response';
import { TeaHouseMainDto } from './tea-house.dto';

@ApiTags('tea-house')
@Controller('/api/v1/tea-houses')
export class TeaHouseController {
  constructor(private readonly TeaHouseFacade: TeaHouseFacade) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse('object', TeaHouseMainDto)
  async retrieveTeaHouseList(): Promise<CommonResponse<TeaHouseMainDto[]>> {
    return CommonResponse.success(
      (await this.TeaHouseFacade.retrieveTeaHouseList()).map(
        (teaHouse) => new TeaHouseMainDto(teaHouse),
      ),
    );
  }
}
