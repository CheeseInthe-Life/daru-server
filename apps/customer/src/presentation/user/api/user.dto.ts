import { UserMainInfo } from '@domain/domain/user/dto/user.info';
import { UserGenderEnum } from '@domain/domain/user/entity/user';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UserMainDto {
  @IsString()
  userId: string;

  @IsString()
  nickname: string;

  @IsString()
  name: string;

  @IsEnum(UserGenderEnum)
  @IsOptional()
  gender?: UserGenderEnum | null;

  @IsNumberString({ length: 4 })
  birthYear: string;

  constructor({
    nickname,
    userId,
    name,
    gender = null,
    birthYear,
  }: UserMainInfo) {
    this.nickname = nickname;
    this.userId = userId;
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }
}
