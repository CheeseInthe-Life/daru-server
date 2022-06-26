import { LocalDateTime } from '@js-joda/core';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocalDateTimeTransformer } from '../util/transformer';

const EXPIRED_TIME = 60 * 3;

@Entity('cellphone_verification')
export class CellphoneVerificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 6 })
  verificationCode: string;

  @Column()
  cellphone: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({
    nullable: true,
    type: 'datetime',
    transformer: new LocalDateTimeTransformer(),
  })
  verifiedAt?: LocalDateTime;

  @Column({ type: 'datetime', transformer: new LocalDateTimeTransformer() })
  expiredAt: LocalDateTime;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static of({
    cellphone,
    verificationCode,
  }: {
    cellphone: string;
    verificationCode: string;
  }): CellphoneVerificationEntity {
    const cellPhoneVerification = new CellphoneVerificationEntity();
    cellPhoneVerification.cellphone = cellphone;
    cellPhoneVerification.expiredAt =
      LocalDateTime.now().plusSeconds(EXPIRED_TIME);
    cellPhoneVerification.verificationCode = verificationCode;
    return cellPhoneVerification;
  }

  isExpired(now: LocalDateTime): boolean {
    return this.expiredAt.isBefore(now);
  }

  verifiedCode(now: LocalDateTime): void {
    this.verified = true;
    this.verifiedAt = now;
  }
}
