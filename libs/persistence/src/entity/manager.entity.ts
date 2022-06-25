import { ManagerGenderEnum } from '@domain/domain/manager/entity/manager';
import { LocalDate } from '@js-joda/core';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocalDateTransformer } from '../util/transformer';

@Entity('manager')
export class ManagerEntity {
  @PrimaryColumn({ length: 32 })
  managerId: string;

  @Column({ length: 16 })
  email: string;

  @Column({ length: 16 })
  phone: string;

  @Column({ length: 64 })
  password: string;

  @Column({
    type: 'timestamp',
    transformer: new LocalDateTransformer(),
  })
  birthday: LocalDate;

  @Column({ type: 'enum', nullable: true, enum: ManagerGenderEnum })
  gender?: ManagerGenderEnum;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;
}
