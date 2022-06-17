import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { AuthFacade } from 'apps/customer/src/application/auth.facade';
import { Request } from 'express';
import { ApiCommonResponse } from '../../documentation/api-common-response.decorator';
import { CommonResponse } from '../../common/response/common-response';

import {
  SignInRequestDto,
  SignUpRequestDto,
  TokenPairDto,
  UserNicknameValidationRequestDto,
  UserNicknameValidationResponseDto,
} from './auth.dto';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Get('kakao')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('kakao'))
  @ApiExcludeEndpoint()
  async signInKakao(): Promise<CommonResponse<null>> {
    return CommonResponse.success(null);
  }

  @Get('kakao/callback')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('kakao'))
  @ApiExcludeEndpoint()
  async callBackFunction(
    @Req() request: Request,
  ): Promise<CommonResponse<TokenPairDto>> {
    return CommonResponse.success(
      await this.authFacade.oauthCallbackProcessing(request),
    );
  }

  @Post('users/nickname/verification')
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse(UserNicknameValidationResponseDto)
  public async validateNickname(
    @Body() dto: UserNicknameValidationRequestDto,
  ): Promise<CommonResponse<UserNicknameValidationResponseDto>> {
    return CommonResponse.success(await this.authFacade.validateNickname(dto));
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse(TokenPairDto)
  public async signInUser(
    @Body() dto: SignInRequestDto,
  ): Promise<CommonResponse<TokenPairDto>> {
    Logger.debug(typeof TokenPairDto);
    return CommonResponse.success(await this.authFacade.signIn(dto));
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse(TokenPairDto)
  public async signUpUser(
    @Body() dto: SignUpRequestDto,
  ): Promise<CommonResponse<TokenPairDto>> {
    return CommonResponse.success(await this.authFacade.signUp(dto));
  }
}
