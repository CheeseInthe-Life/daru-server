import { DateTimeUtil } from '@infra/persistence/util/date-time-util';
import { LocalDate, LocalDateTime } from '@js-joda/core';
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
  gender: ManagerGenderEnum | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor({
    managerId,
    email,
    phone,
    password,
    birthday,
    gender,
    createdAt,
    updatedAt,
    deletedAt,
  }: {
    managerId: string;
    email: string;
    phone: string;
    password: string;
    birthday: LocalDate;
    gender: ManagerGenderEnum | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
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
    gender = null,
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
}
