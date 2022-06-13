import { UserGenderEnum, User } from '../entity/user';

export class RegisterUserCommand {
  providerId: string;
  nickname: string;
  name: string;
  gender: UserGenderEnum;
  birthYear: string;

  constructor({
    providerId,
    nickname,
    name,
    gender,
    birthYear,
  }: {
    providerId: string;
    nickname: string;
    name: string;
    gender: UserGenderEnum;
    birthYear: string;
  }) {
    this.providerId = providerId;
    this.nickname = nickname;
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }

  toUser(): User {
    return User.of({
      providerId: this.providerId,
      nickname: this.nickname,
      name: this.name,
      gender: this.gender,
      birthYear: this.birthYear,
    });
  }
}
