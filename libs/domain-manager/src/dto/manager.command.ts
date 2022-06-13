import { LocalDate } from '@js-joda/core';
import { Manager, ManagerGenderEnum } from '../entity/manager';

export class RegisterManagerCommand {
  email: string;
  phone: string;
  password: string;
  birthday: LocalDate;
  gender: ManagerGenderEnum | null;

  constructor({
    email,
    phone,
    password,
    birthday,
    gender,
  }: {
    email: string;
    phone: string;
    password: string;
    birthday: LocalDate;
    gender?: ManagerGenderEnum;
  }) {
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.birthday = birthday;
    this.gender = gender;
  }

  toManager(): Manager {
    return Manager.of({
      email: this.email,
      phone: this.phone,
      password: this.password,
      birthday: this.birthday,
      gender: this.gender,
    });
  }
}
