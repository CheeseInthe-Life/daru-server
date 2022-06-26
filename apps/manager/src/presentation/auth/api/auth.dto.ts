import { ManagerGenderEnum } from '@domain/domain/manager/entity/manager';
import { CellphoneVerificationEntity } from '@infra/persistence/entity/cellphone-verification.entity';
import { LocalDate } from '@js-joda/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { IsEmail, IsPhone } from 'common/util/regex';

export class RegisterManagerDto {
  @ApiProperty()
  @Matches(IsEmail)
  email: string;
  @ApiProperty()
  @Matches(IsPhone)
  phone: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty({
    example: '2020-01-01',
  })
  @IsString()
  birthday: LocalDate;
  @ApiProperty()
  @IsEnum(ManagerGenderEnum)
  @IsOptional()
  gender?: ManagerGenderEnum;
}

export class SendSmsDto {
  @ApiProperty()
  @Matches(IsPhone)
  cellphone: string;
}

export class SendSmsResultDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  verificationCode: string;
  @ApiProperty()
  cellphone: string;
  @ApiProperty()
  expiredAt: string;

  constructor(cellphoneVerification: CellphoneVerificationEntity) {
    this.id = cellphoneVerification.id;
    this.verificationCode = cellphoneVerification.verificationCode;
    this.cellphone = cellphoneVerification.cellphone;
    this.expiredAt = cellphoneVerification.expiredAt.toString();
  }
}

export class VerifyCodeDto {
  @ApiProperty()
  @IsInt()
  requestId: number;
  @ApiProperty()
  @IsString()
  verificationCode: string;
}

export class VerifyCodeResultDto {
  @ApiProperty()
  @IsBoolean()
  isValid: boolean;

  constructor(cellphoneVerification: CellphoneVerificationEntity) {
    this.isValid = cellphoneVerification.verified;
  }
}
