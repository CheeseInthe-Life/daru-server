import { RegisterUserCommand } from '@domain/domain-user/dto/user.command';
import { TokenPair } from '@domain/domain-user/dto/user.info';
import { GenderEnum } from '@domain/domain-user/entity/user';
import {
  AccountEntity,
  AccountStatusEnum,
  ProviderChannelEnum,
} from '@infra/persistence/entity/account.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsJWT,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { Optional } from '../../common/common-type';

export class SignUpDto {
  @ApiProperty()
  @IsNumber()
  accountId: number;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  nickname: string;
  @ApiProperty({ enum: GenderEnum })
  @IsEnum(GenderEnum)
  gender: Optional<GenderEnum>;
  @ApiProperty()
  @IsNumberString({ length: 4 })
  birthYear: string;
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
  @IsNumber()
  accountId: number;
  @IsString()
  providerId: string;
  @IsEnum(ProviderChannelEnum)
  providerName: ProviderChannelEnum;
  @IsEnum(AccountStatusEnum)
  status: AccountStatusEnum;
  @IsString()
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

export class UserNicknameValidationDto {
  @ApiProperty()
  @IsString()
  nickname: string;
}

export class TokenPairDto {
  @ApiProperty()
  @IsJWT()
  accessToken: string;
  @ApiProperty()
  @IsJWT()
  refreshToken: string;
}
