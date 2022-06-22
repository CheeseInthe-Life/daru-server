import { TeaHouseSchedule } from '@domain/domain/tea-house/entity/tea-house';
import { Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class TeaHouseAddress {
  @Column()
  address: string;

  @Column()
  detailAddress: string;

  @Column()
  postcode: string;
}

@Entity('tea_house')
export class TeaHouseEntity {
  @PrimaryColumn()
  teaHouseId: string;

  @Column()
  managerId: string;

  @Column()
  name: string;

  @Type(() => TeaHouseAddress)
  @Column()
  teaHouseAddress: TeaHouseAddress;

  @Column()
  teaHouseContractNumber: string;

  @Column()
  categoryOfBusiness: string;

  @Column()
  isRepresentative: boolean;

  @Column({ type: 'json' })
  schedule: TeaHouseSchedule;

  @Column()
  businessLicenseCopy: string;

  @Column()
  instagramUrl: string;

  @Column()
  etcLinkUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
