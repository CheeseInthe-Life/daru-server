import {
  Manager,
  ManagerGenderEnum,
} from '@domain/domain/manager/entity/manager';
import { LocalDate } from '@js-joda/core';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { appendFile } from 'fs';

export class ManagerMainDto {
  @ApiProperty()
  managerId: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  birthday: LocalDate;
  @ApiPropertyOptional()
  gender?: ManagerGenderEnum;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  updatedAt?: Date;

  constructor(manager: Manager) {
    this.managerId = manager.managerId;
    this.email = manager.email;
    this.phone = manager.phone;
    this.birthday = manager.birthday;
    this.gender = manager.gender;
    this.createdAt = manager.createdAt;
    this.updatedAt = manager.updatedAt;
  }
}
