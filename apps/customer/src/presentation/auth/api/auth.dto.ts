import { UserGenderEnum } from '@domain/domain/user/entity/user';
import {
  AccountEntity,
  ProviderChannelEnum,
} from '@infra/persistence/entity/account.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { Optional } from '../../common/common-type';

export class SignUpRequestDto {
  @ApiProperty({ enum: ProviderChannelEnum })
  @IsEnum(ProviderChannelEnum)
  providerName: ProviderChannelEnum;
  @ApiProperty()
  @IsString()
  providerAccessToken: string;
  @ApiProperty()
  @IsString()
  nickname: string;
  @ApiProperty({ enum: UserGenderEnum })
  @IsEnum(UserGenderEnum)
  gender: Optional<UserGenderEnum>;
  @ApiProperty()
  @IsNumberString({ length: 4 })
  birthYear: string;
}

export class SignInRequestDto {
  @ApiProperty({ enum: ProviderChannelEnum })
  @IsEnum(ProviderChannelEnum)
  readonly providerName: ProviderChannelEnum;
  @ApiProperty()
  @IsString()
  readonly providerAccessToken: string;
}

export class AccountMainDto {
  @IsNumber()
  accountId: number;
  @IsString()
  providerId: string;
  @IsEnum(ProviderChannelEnum)
  providerName: ProviderChannelEnum;
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
    accountMainDto.connectedAt = account.connectedAt.toString();
    return accountMainDto;
  }
}

export class UserNicknameValidationRequestDto {
  @ApiProperty()
  @IsString()
  readonly nickname: string;
}

export class UserNicknameValidationResponseDto {
  @ApiProperty()
  @IsBoolean()
  isValid: boolean;
}
export class TokenPairDto {
  @ApiProperty()
  @IsString()
  readonly accessToken: string;
  @ApiProperty()
  @IsString()
  readonly refreshToken: string;
}
