import { LocalDate } from '@js-joda/core';
import { Bcrypt } from 'common/util/bcrypt';
import { ulid } from 'ulid';
export enum ManagerGenderEnum {
  남성 = 'MALE',
  여성 = 'FEMALE',
}

export class Manager {
  managerId: string;
  email: string;
  phone: string;
  password: string;
  birthday: LocalDate;
  gender?: ManagerGenderEnum;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor({
    managerId,
    email,
    phone,
    password,
    birthday,
    gender,
    createdAt = new Date(),
    updatedAt = new Date(),
    deletedAt = new Date(),
  }: {
    managerId: string;
    email: string;
    phone: string;
    password: string;
    birthday: LocalDate;
    gender?: ManagerGenderEnum;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }) {
    this.managerId = managerId;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.birthday = birthday;
    this.gender = gender;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static of({
    managerId = ulid(),
    email,
    phone,
    password,
    birthday,
    gender,
  }: {
    managerId?: string;
    email: string;
    phone: string;
    password: string;
    birthday: LocalDate;
    gender?: ManagerGenderEnum;
  }): Manager {
    return new Manager({
      managerId,
      email,
      phone,
      password,
      birthday,
      gender,
    });
  }

  hashPassword() {
    this.password = Bcrypt.hash(this.password);
  }
}
