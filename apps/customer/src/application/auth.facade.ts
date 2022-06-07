import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPair, UserMainInfo } from '@domain/domain-user/dto/user.info';
import { Request } from 'express';
import { User } from '@domain/domain-user/entity/user';
import { Optional } from '../presentation/common/common-type';
import {
  AccountEntity,
  AccountStatusEnum,
  ProviderChannelEnum,
} from '@infra/persistence/entity/account.entity';
import { UserService } from '@domain/domain-user';
import {
  SignUpDto,
  UserNicknameValidationDto,
} from '../presentation/auth/api/auth.dto';
import { UserDIToken } from '@domain/domain-user/di/domain-user.token';
import { EntityNotFoundError } from 'typeorm';
import { AccountRepositoryImpl } from '@infra/persistence/repository/account.repository';
import { AccountNotFoundException } from '../presentation/common/exception/account-not-found.exception';
import { UserAlreadyRegisterException } from '../presentation/common/exception/user-already-register-exception';
import { RegisterUserCommand } from '@domain/domain-user/dto/user.command';

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
  ) {}

  async validateNickname(dto: UserNicknameValidationDto): Promise<boolean> {
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
    const isValid = user ? false : true;

    return isValid;
  }

  async signUp(dto: SignUpDto): Promise<TokenPair> {
    const account = await this.accountRepository
      .findAccountByAccountId({
        accountId: dto.accountId,
      })
      .catch((error: Error) => {
        if (error instanceof EntityNotFoundError) {
          throw new AccountNotFoundException();
        } else {
          throw error;
        }
      });

    if (account.status !== AccountStatusEnum.계정연결)
      throw new UserAlreadyRegisterException();

    const user = await this.userService.registerUser(
      new RegisterUserCommand({ ...dto, providerId: account.providerId }),
    );

    account.completeSignUp();
    await this.accountRepository.store(account);

    return this.createTokenPair({ userId: user.userId });
  }

  async oauthCallbackProcessing(request: Request): Promise<{
    account: Optional<AccountEntity>;
    tokenPair: Optional<TokenPair>;
  }> {
    const user = request.user as {
      providerId: string;
      providerName: ProviderChannelEnum;
      account: Optional<AccountEntity>;
      user: Optional<User>;
    };

    let tokenPair: Optional<TokenPair> = undefined;
    if (user.user) {
      tokenPair = this.createTokenPair({ userId: user.user.userId });
    }

    return {
      account: user.account,
      tokenPair,
    };
  }

  private createTokenPair({ userId }: JwtPayload): TokenPair {
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
