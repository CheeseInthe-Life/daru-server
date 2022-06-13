import { UserGenderEnum, User } from '../entity/user';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class UserMainInfo {
  userId: string;
  providerId: string;
  nickname: string;
  name: string;
  gender: UserGenderEnum | null;
  birthYear: string;

  private constructor({
    userId,
    providerId,
    nickname,
    name,
    gender,
    birthYear,
  }: User) {
    this.userId = userId;
    this.providerId = providerId;
    this.nickname = nickname;
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }

  static of(user: User) {
    return new UserMainInfo(user);
  }
}
