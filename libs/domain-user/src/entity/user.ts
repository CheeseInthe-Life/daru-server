import { ulid } from 'ulid';
export enum GenderEnum {
  남성 = 'MALE',
  여성 = 'FEMALE',
}
export class User {
  userId: string;
  providerId: string;
  email: string;
  nickname: string;
  gender: GenderEnum;

  private constructor() {
    return;
  }

  static of({
    nickname,
    email,
    providerId,
    gender,
  }: {
    nickname: string;
    email: string;
    providerId: string;
    gender?: GenderEnum;
  }): User {
    const user = new User();
    user.userId = ulid();
    user.nickname = nickname;
    user.email = email;
    user.providerId = providerId;
    user.gender = gender;
    return user;
  }
}
