import { ulid } from 'ulid';
export enum GenderEnum {
  남성 = 'MALE',
  여성 = 'FEMALE',
}
export class User {
  userId: string;
  providerId: string;
  name: string;
  nickname: string;
  gender: GenderEnum | null;
  birthYear: string;

  private constructor() {
    return;
  }

  static of({
    nickname,
    providerId,
    gender,
    name,
    birthYear,
  }: {
    nickname: string;
    providerId: string;
    name: string;
    birthYear: string;
    gender?: GenderEnum;
  }): User {
    const user = new User();
    user.userId = ulid();
    user.nickname = nickname;
    user.providerId = providerId;
    user.gender = gender;
    user.birthYear = birthYear;
    user.name = name;
    return user;
  }
}
