import 'dotenv/config';
import { Inject, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '@domain/domain-user/repository/user.repository';
import { UserDIToken } from '@domain/domain-user/di/domain-user.token';
import { EntityNotFoundError } from 'typeorm';
import {
  AccountEntity,
  ProviderChannelEnum,
} from '@infra/persistence/entity/account.entity';
import { AccountRepositoryImpl } from '@infra/persistence/repository/account.repository';
import { User } from '@domain/domain-user/entity/user';
import { DateTimeUtil } from '@infra/persistence/util/date-time-util';

const { KAKAO_CLIENT_KEY, KAKAO_CLIENT_SECRET_KEY, KAKAO_REDIRECT_URL } =
  process.env;
export interface KakaoAccount {
  id: number;
  connected_at: string;
}

export interface KakaoProfile {
  provider: string;
  id: number;
  username: string;
  displayName: string;
  _json: KakaoAccount;
}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject(UserDIToken.AccountRepository)
    private readonly accountRepository: AccountRepositoryImpl,
    @Inject(UserDIToken.UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      clientID: KAKAO_CLIENT_KEY as string,
      clientSecret: KAKAO_CLIENT_SECRET_KEY as string,
      callbackURL: KAKAO_REDIRECT_URL as string,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    kakaoProfile: KakaoProfile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    const providerId = String(kakaoProfile.id);
    const providerName = ProviderChannelEnum.카카오;

    const account = await this.accountRepository
      .findAccountByProviderIdAndProviderName({
        providerId,
        providerName,
      })
      .catch(async (error: EntityNotFoundError) => {
        if (error instanceof EntityNotFoundError) {
          return await this.accountRepository.store(
            AccountEntity.of({
              providerId,
              providerName,
              connectedAt: DateTimeUtil.toLocalDateTime(
                kakaoProfile._json.connected_at,
              ),
            }),
          );
        } else {
          throw error;
        }
      });

    let user: User | undefined = undefined;
    if (account) {
      user = await this.userRepository
        .findUserByProviderId({
          providerId,
        })
        .catch((error: EntityNotFoundError) => {
          if (error instanceof EntityNotFoundError) {
            return undefined;
          } else {
            throw error;
          }
        });
    }

    return done(null, {
      providerId,
      providerName,
      account,
      user,
    });
  }
}
