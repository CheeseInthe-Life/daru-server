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
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
  })
  connectedAt: LocalDateTime;

  @Column({ length: 32 })
  userId: string;

  @Column({ length: 256, nullable: true, type: 'varchar' })
  refreshToken: string | null;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  private constructor() {
    return;
  }

  static of({
    providerId,
    providerName,
    connectedAt,
    username,
    userId,
    refreshToken = null,
  }: {
    providerId: string;
    providerName: ProviderChannelEnum;
    connectedAt: LocalDateTime;
    username: string;
    userId: string;
    refreshToken?: string | null;
  }): AccountEntity {
    const account = new AccountEntity();
    account.providerId = providerId;
    account.providerName = providerName;
    account.connectedAt = connectedAt;
    account.username = username;
    account.userId = userId;
    account.refreshToken = refreshToken;
    return account;
  }

  modify({ refreshToken }: { refreshToken?: string }) {
    if (refreshToken) this.refreshToken = refreshToken;
  }

  getCreatedAt(): LocalDateTime | null {
    return DateTimeUtil.toLocalDateTime(this.createdAt);
  }

  getUpdatedAt(): LocalDateTime | null {
    return DateTimeUtil.toLocalDateTime(this.updatedAt);
  }
}
