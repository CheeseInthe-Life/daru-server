import { UserMainInfo } from '@domain/domain/user/dto/user.info';
import { User } from '@domain/domain/user/entity/user';
import { PickType } from '@nestjs/mapped-types';

export class UserMainDto extends PickType(User, [
  'userId',
  'birthYear',
  'gender',
  'name',
  'nickname',
] as const) {
  constructor({ nickname, userId, name, gender, birthYear }: UserMainInfo) {
    super();
    this.nickname = nickname;
    this.userId = userId;
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }
}
