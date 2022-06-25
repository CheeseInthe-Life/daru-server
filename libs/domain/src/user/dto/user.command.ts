import { UserGenderEnum, User } from '../entity/user';

export class RegisterUserCommand {
  providerId: string;
  nickname: string;
  name: string;
  gender: UserGenderEnum | null;
  birthYear: string;

  constructor({
    nickname,
    name,
    gender,
    birthYear,
  }: {
    nickname: string;
    name: string;
    gender: UserGenderEnum | null;
    birthYear: string;
  }) {
    this.nickname = nickname;
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }

  toUser(): User {
    return new User({
      nickname: this.nickname,
      name: this.name,
      gender: this.gender,
      birthYear: this.birthYear,
    });
  }
}
