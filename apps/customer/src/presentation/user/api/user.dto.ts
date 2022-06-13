import { UserMainInfo } from '@domain/domain-user/dto/user.info';
import { UserGenderEnum } from '@domain/domain-user/entity/user';
import { IsEnum, IsNumberString, IsString } from 'class-validator';

export class UserMainDto {
  @IsString()
  userId: string;

  @IsString()
  providerId: string;

  @IsString()
  nickname: string;

  @IsString()
  name: string;

  @IsEnum(UserGenderEnum)
  gender: UserGenderEnum | null;

  @IsNumberString({ length: 4 })
  birthYear: string;

  constructor({
    nickname,
    providerId,
    userId,
    name,
    gender,
    birthYear,
  }: UserMainInfo) {
    this.nickname = nickname;
    this.providerId = providerId;
    this.userId = userId;
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }
}
