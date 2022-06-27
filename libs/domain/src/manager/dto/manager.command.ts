import { LocalDate } from '@js-joda/core';
import { RegisterManagerDto } from 'apps/manager/src/presentation/auth/api/auth.dto';
import { Manager, ManagerGenderEnum } from '../entity/manager';

export class RegisterManagerCommand {
  email: string;
  phone: string;
  password: string;
  birthday: LocalDate;
  gender?: ManagerGenderEnum;

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

  static of(dto: {
    email: string;
    phone: string;
    password: string;
    birthday: LocalDate;
    gender?: ManagerGenderEnum;
  }) {
    return new RegisterManagerCommand({
      birthday: dto.birthday,
      email: dto.email,
      password: dto.password,
      phone: dto.phone,
    });
  }

  toEntity(): Manager {
    return Manager.of({
      email: this.email,
      phone: this.phone,
      password: this.password,
      birthday: this.birthday,
      gender: this.gender,
    });
  }
}
