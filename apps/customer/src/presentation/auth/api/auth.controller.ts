import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { AuthFacade } from 'apps/customer/src/application/auth.facade';
import { Request } from 'express';
import { CommonResponse } from '../../common/response/common-response';

import {
  AccountSignInDto,
  SignUpDto,
  TokenPairDto,
  UserNicknameValidationDto,
} from './auth.dto';

@Controller('api/v1/auth')
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

  @Post('users/nickname/verification')
  @HttpCode(HttpStatus.OK)
  public async validateNickname(
    @Body() dto: UserNicknameValidationDto,
  ): Promise<CommonResponse<boolean>> {
    return CommonResponse.success(await this.authFacade.validateNickname(dto));
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  public async signUpUser(
    @Body() dto: SignUpDto,
  ): Promise<CommonResponse<TokenPairDto>> {
    return CommonResponse.success(await this.authFacade.signUp(dto));
  }
}
