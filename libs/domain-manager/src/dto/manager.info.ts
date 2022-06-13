import { LocalDate } from '@js-joda/core';
import { Manager, ManagerGenderEnum } from '../entity/manager';

export class ManagerMainInfo {
  managerId: string;
  email: string;
  phone: string;
  password: string;
  birthday: LocalDate;
  gender: ManagerGenderEnum | null;

  private constructor({
    birthday,
    email,
    gender,
    managerId,
    phone,
    password,
  }: Manager) {
    this.birthday = birthday;
    this.email = email;
    this.gender = gender;
    this.managerId = managerId;
    this.phone = phone;
    this.password = password;
  }

  static of(manager: Manager) {
    return new ManagerMainInfo(manager);
  }
}
