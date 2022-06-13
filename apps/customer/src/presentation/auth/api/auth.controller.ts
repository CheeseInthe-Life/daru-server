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
import { ApiExcludeEndpoint, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AuthFacade } from 'apps/customer/src/application/auth.facade';
import { Request } from 'express';
import { ApiCommonResponse } from '../../documentation/api-common-response.decorator';
import { CommonResponse } from '../../common/response/common-response';

import {
  AccountSignInDto,
  SignUpDto,
  TokenPairDto,
  UserNicknameValidationDto,
} from './auth.dto';

@ApiTags('auth')
@Controller('api/v1/auth')
@ApiExtraModels(CommonResponse)
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
  ): Promise<CommonResponse<AccountSignInDto>> {
    return CommonResponse.success(
      AccountSignInDto.of(
        await this.authFacade.oauthCallbackProcessing(request),
      ),
    );
  }

  @Post('users/nickname/verification')
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse('boolean')
  public async validateNickname(
    @Body() dto: UserNicknameValidationDto,
  ): Promise<CommonResponse<boolean>> {
    return CommonResponse.success(await this.authFacade.validateNickname(dto));
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse(TokenPairDto)
  public async signUpUser(
    @Body() dto: SignUpDto,
  ): Promise<CommonResponse<TokenPairDto>> {
    return CommonResponse.success(await this.authFacade.signUp(dto));
  }
}
