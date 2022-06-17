import { UserMainInfo } from '@domain/domain/user/dto/user.info';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserFacade } from 'apps/customer/src/application/user.facade';
import { CommonResponse } from '../../common/response/common-response';

@ApiTags('users')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getUserList(): Promise<CommonResponse<UserMainInfo[]>> {
    return CommonResponse.success(await this.userFacade.retrieveUserList());
  }
}
