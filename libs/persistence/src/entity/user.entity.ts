import { UserGenderEnum } from '@domain/domain-user/entity/user';
import { LocalDateTime } from '@js-joda/core';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTimeUtil } from '../util/date-time-util';

@Entity({
  name: 'user',
})
@Index(['nickname'], { unique: true })
export class UserEntity {
  @PrimaryColumn({ length: 32 })
  userId: string;

  @Column({
    length: 128,
  })
  providerId: string;

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
  gender: UserGenderEnum | null;

  @Column({
    length: 4,
  })
  birthYear: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
