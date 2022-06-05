import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthFacade } from 'apps/customer/src/application/auth.facade';
import { Request } from 'express';
import { CommonResponse } from '../../common/response/common-response';
import { AccountSignInDto } from './auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Get('kakao')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('kakao'))
  async signInKakao(): Promise<CommonResponse<null>> {
    return CommonResponse.success(null);
  }

  @Get('kakao/callback')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('kakao'))
  async callBackFunction(
    @Req() request: Request,
  ): Promise<CommonResponse<AccountSignInDto>> {
    return CommonResponse.success(
      AccountSignInDto.of(
        await this.authFacade.oauthCallbackProcessing(request),
      ),
    );
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  private signUp() {}
}
