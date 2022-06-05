import { GenderEnum } from '@domain/domain-user/entity/user';
import { LocalDateTime } from '@js-joda/core';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTimeUtil } from '../util/date-time-util';
import { LocalDateTimeTransformer } from '../util/transformer';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryColumn({ length: 32 })
  userId: string;

  @Column({
    length: 128,
  })
  providerId: string;

  @Column({
    length: 64,
  })
  email: string;

  @Column({
    length: 16,
  })
  name: string;

  @Column({
    length: 16,
  })
  nickname: string;

  @Column({
    nullable: true,
    length: 8,
  })
  gender: GenderEnum | null;

  @Column({
    length: 4,
  })
  birthYear: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  getCreatedAt(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.createdAt);
  }

  getUpdatedAt(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.updatedAt);
  }

  getDeletedAt(): LocalDateTime | null {
    return DateTimeUtil.toLocalDateTime(this.deletedAt);
  }
}
