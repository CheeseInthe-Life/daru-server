import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  AccountEntity,
  ProviderChannelEnum,
} from '@infra/persistence/entity/account.entity';
import { UserService } from '@domain/domain-user';
import {
  SignInRequestDto,
  SignUpRequestDto,
  TokenPairDto,
  UserNicknameValidationRequestDto,
  UserNicknameValidationResponseDto,
} from '../presentation/auth/api/auth.dto';
import { UserDIToken } from '@domain/domain-user/di/domain-user.token';
import { EntityNotFoundError } from 'typeorm';
import { AccountRepositoryImpl } from '@infra/persistence/repository/account.repository';
import { KakaoService } from '@infra/kakao';
import { DateTimeUtil } from '@infra/persistence/util/date-time-util';
import { RegisterUserCommand } from '@domain/domain-user/dto/user.command';
import { ProviderNotSupportedException } from '../presentation/common/exception/provider-not-supported.exception';
import { UserAlreadyRegisterException } from '../presentation/common/exception/user-already-register-exception';

export interface JwtPayload {
  userId: string;
}
@Injectable()
export class AuthFacade {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(UserDIToken.AccountRepository)
    private readonly accountRepository: AccountRepositoryImpl,
    @Inject(UserDIToken.UserService)
    private readonly userService: UserService,
    private readonly kakaoService: KakaoService,
  ) {}

  async validateNickname(
    dto: UserNicknameValidationRequestDto,
  ): Promise<UserNicknameValidationResponseDto> {
    const user = await this.userService
      .retrieveUserByNickname({
        nickname: dto.nickname,
      })
      .catch((error: Error) => {
        if (error instanceof EntityNotFoundError) {
          return undefined;
        } else {
          throw error;
        }
      });

    return user ? { isValid: false } : { isValid: true };
  }

  async signUp(dto: SignUpRequestDto): Promise<TokenPairDto> {
    const { birthYear, gender, nickname, providerName, providerAccessToken } =
      dto;

    if (providerName === ProviderChannelEnum.카카오) {
      const { id, connected_at, properties } =
        await this.kakaoService.getAccount({
          accessToken: providerAccessToken,
        });

      const isRegister = await this.accountRepository
        .findAccountByProviderIdAndProviderName({
          providerId: String(id),
          providerName,
        })
        .catch((exception: EntityNotFoundError) => {
          return null;
        });

      if (isRegister) {
        throw new UserAlreadyRegisterException();
      }

      const user = await this.userService.registerUser(
        new RegisterUserCommand({
          name: properties.nickname,
          gender: gender,
          birthYear: birthYear,
          nickname: nickname,
        }),
      );
      const tokenPair = this.createTokenPair({ userId: user.userId });

      const account = AccountEntity.of({
        providerId: String(id),
        providerName,
        connectedAt: DateTimeUtil.toLocalDateTime(connected_at),
        username: properties.nickname,
        userId: user.userId,
        refreshToken: tokenPair.refreshToken,
      });

      await this.accountRepository.store(account);

      return tokenPair;
    } else if (providerName === ProviderChannelEnum.애플) {
      throw new ProviderNotSupportedException();
    } else {
      throw new ProviderNotSupportedException();
    }
  }

  async signIn(dto: SignInRequestDto): Promise<TokenPairDto> {
    const { providerAccessToken, providerName } = dto;
    if (providerName === ProviderChannelEnum.카카오) {
      const { id } = await this.kakaoService.getAccount({
        accessToken: providerAccessToken,
      });

      const account: AccountEntity | undefined = await this.accountRepository
        .findAccountByProviderIdAndProviderName({
          providerId: String(id),
          providerName: providerName,
        })
        .catch((exception: EntityNotFoundError) => undefined);

      if (!account) return { accessToken: null, refreshToken: null };

      const tokenPair = this.createTokenPair({ userId: account.userId });

      account.modify({ refreshToken: tokenPair.refreshToken });
      await this.accountRepository.store(account);

      return tokenPair;
    }
  }

  async oauthCallbackProcessing(request: Request): Promise<TokenPairDto> {
    return request.user as {
      accessToken: string;
      refreshToken: string;
    };
  }

  private createTokenPair({ userId }: JwtPayload): TokenPairDto {
    const payload = { userId };
    return {
      accessToken: this.jwtService.sign(payload, {
        ...this.configService.get('jwt').access,
      }),
      refreshToken: this.jwtService.sign(payload, {
        ...this.configService.get('jwt').refresh,
      }),
    };
  }
}
