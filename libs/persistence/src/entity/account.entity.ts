import { LocalDateTime } from '@js-joda/core';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTimeUtil } from '../util/date-time-util';
import { LocalDateTimeTransformer } from '../util/transformer';
export enum ProviderChannelEnum {
  카카오 = 'KAKAO',
  애플 = 'APPLE',
}

export enum AccountStatusEnum {
  계정연결 = 'CONNECTION',
  가입완료 = 'COMPLETE_SIGNUP',
  계정탈퇴 = 'WITHDRAWAL',
}

@Entity({
  name: 'account',
})
@Index(['providerId', 'providerName'], { unique: true })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  accountId: number;

  @Column({
    length: 128,
  })
  providerId: string;

  @Column({
    length: 8,
  })
  providerName: ProviderChannelEnum;

  @Column({
    length: 32,
  })
  username: string;

  @Column({
    length: 16,
  })
  status: AccountStatusEnum;

  @Column({
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
    nullable: true,
  })
  connectedAt: LocalDateTime | null;

  @Column({ length: 32, nullable: true })
  userId: string | null;

  @Column({ length: 256, nullable: true })
  refreshToken: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  private constructor() {
    return;
  }

  static of({
    providerId,
    providerName,
    connectedAt,
    username,
  }: {
    providerId: string;
    providerName: ProviderChannelEnum;
    connectedAt: LocalDateTime;
    username: string;
  }): AccountEntity {
    const account = new AccountEntity();
    account.providerId = providerId;
    account.providerName = providerName;
    account.status = AccountStatusEnum.계정연결;
    account.connectedAt = connectedAt;
    account.username = username;

    return account;
  }

  modify({ userId, refreshToken }: { userId?: string; refreshToken?: string }) {
    if (userId) this.userId = userId;
    if (refreshToken) this.refreshToken = refreshToken;
  }

  withdrawalAccount() {
    this.status = AccountStatusEnum.계정탈퇴;
  }

  completeSignUp() {
    this.status = AccountStatusEnum.가입완료;
  }

  getCreatedAt(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.createdAt);
  }

  getUpdatedAt(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.updatedAt);
  }
}
