import { ulid } from 'ulid';
export enum UserGenderEnum {
  남성 = 'MALE',
  여성 = 'FEMALE',
}
export class User {
  userId: string;
  providerId: string;
  name: string;
  nickname: string;
  gender: UserGenderEnum | null;
  birthYear: string;

  private constructor() {
    return;
  }

  static of({
    userId = ulid(),
    nickname,
    providerId,
    gender,
    name,
    birthYear,
  }: {
    userId?: string;
    nickname: string;
    providerId: string;
    name: string;
    birthYear: string;
    gender?: UserGenderEnum;
  }): User {
    const user = new User();
    user.userId = userId;
    user.nickname = nickname;
    user.providerId = providerId;
    user.gender = gender;
    user.birthYear = birthYear;
    user.name = name;
    return user;
  }
}
