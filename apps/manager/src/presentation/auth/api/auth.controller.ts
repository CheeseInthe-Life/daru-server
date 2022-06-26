import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthFacade } from 'apps/manager/src/application/auth.facade';
import { ApiCommonResponse } from 'common/decorator/api-common-response.decorator';
import { CommonResponse } from 'common/response/common-response';
import {
  SendSmsDto,
  SendSmsResultDto,
  VerifyCodeDto,
  VerifyCodeResultDto,
} from './auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Post('cellphone')
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse('object', SendSmsResultDto)
  async sendVerificationCode(
    @Body() dto: SendSmsDto,
  ): Promise<CommonResponse<SendSmsResultDto>> {
    return CommonResponse.success(
      new SendSmsResultDto(
        await this.authFacade.sendVerificationCode(dto.cellphone),
      ),
    );
  }

  @Post('cellphone/verification')
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse('object', VerifyCodeResultDto)
  async verifyCode(
    @Body() dto: VerifyCodeDto,
  ): Promise<CommonResponse<VerifyCodeResultDto>> {
    return CommonResponse.success(
      new VerifyCodeResultDto(await this.authFacade.verifyCode(dto)),
    );
  }

  @Get('sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(): Promise<void> {
    return;
  }
}
