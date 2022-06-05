import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPair } from '@domain/domain-user/dto/user.info';
import { Request } from 'express';
import { User } from '@domain/domain-user/entity/user';
import { Optional } from '../presentation/common/common-type';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AccountEntity,
  ProviderChannelEnum,
} from '@infra/persistence/entity/account.entity';
import { AccountRepositoryImpl } from '@infra/persistence/repository/account.repository';
import { DomainUserService } from '@domain/domain-user';

export interface JwtPayload {
  userId: string;
}
@Injectable()
export class AuthFacade {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: DomainUserService,
    @InjectRepository(AccountEntity)
    private readonly AccountRepository: AccountRepositoryImpl,
  ) {}

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
        ...this.configService.get('jwt.access'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        ...this.configService.get('jwt.refresh'),
      }),
    };
  }
}
