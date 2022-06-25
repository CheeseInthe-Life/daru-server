import { ulid } from 'ulid';
export enum UserGenderEnum {
  남성 = 'MALE',
  여성 = 'FEMALE',
}
export class User {
  userId: string;
  name: string;
  nickname: string;
  gender: UserGenderEnum | null;
  birthYear: string;

  constructor({
    userId = ulid(),
    nickname,
    gender,
    name,
    birthYear,
  }: {
    userId?: string;
    nickname: string;
    name: string;
    birthYear: string;
    gender: UserGenderEnum | null;
  }) {
    this.userId = userId;
    this.nickname = nickname;
    this.gender = gender;
    this.birthYear = birthYear;
    this.name = name;
  }
}
