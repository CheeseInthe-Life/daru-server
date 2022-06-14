import { UserGenderEnum, User } from '../entity/user';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class UserMainInfo {
  userId: string;
  nickname: string;
  name: string;
  gender: UserGenderEnum | null;
  birthYear: string;

  private constructor({ userId, nickname, name, gender, birthYear }: User) {
    this.userId = userId;
    this.nickname = nickname;
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }

  static of(user: User) {
    return new UserMainInfo(user);
  }
}
