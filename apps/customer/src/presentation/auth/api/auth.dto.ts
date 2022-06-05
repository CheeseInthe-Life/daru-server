import { TokenPair } from '@domain/domain-user/dto/user.info';
import { GenderEnum } from '@domain/domain-user/entity/user';
import {
  AccountEntity,
  AccountStatusEnum,
  ProviderChannelEnum,
} from '@infra/persistence/entity/account.entity';
import { Optional } from '../../common/common-type';

class SignUpDto {
  providerId: string;
  providerName: ProviderChannelEnum;
  email: string;
  nickname: string;
  gender: GenderEnum;
}

export class AccountSignInDto {
  account: AccountMainDto;
  tokenPair: Optional<TokenPair>;

  private constructor({
    account,
    tokenPair,
  }: {
    account: AccountEntity;
    tokenPair: Optional<TokenPair>;
  }) {
    this.account = AccountMainDto.of(account);
    this.tokenPair = tokenPair;
  }

  static of({
    account,
    tokenPair,
  }: {
    account: AccountEntity;
    tokenPair: Optional<TokenPair>;
  }) {
    return new AccountSignInDto({
      account,
      tokenPair,
    });
  }
}

export class AccountMainDto {
  accountId: number;
  providerId: string;
  providerName: ProviderChannelEnum;
  status: AccountStatusEnum;
  connectedAt: string;

  private constructor() {
    return;
  }

  static of(account: AccountEntity): AccountMainDto {
    const accountMainDto = new AccountMainDto();
    accountMainDto.accountId = account.accountId;
    accountMainDto.providerId = account.providerId;
    accountMainDto.providerName = account.providerName;
    accountMainDto.status = account.status;
    accountMainDto.connectedAt = account.connectedAt.toString();
    return accountMainDto;
  }
}
