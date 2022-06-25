import {
  TeaHouse,
  TeaHouseSchedule,
  TeaHouseStatus,
} from '@domain/domain/tea-house/entity/tea-house';
import { Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

class TeaHouseAddress {
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

  @Column({ nullable: true })
  managerId?: string;

  @Column()
  name: string;

  @Type(() => TeaHouseAddress)
  @Column()
  teaHouseAddress: TeaHouseAddress;

  @Column({ nullable: true })
  teaHouseContractNumber?: string;

  @Column()
  categoryOfBusiness: string;

  @Column({ type: 'json' })
  schedule: TeaHouseSchedule;

  @Column({ nullable: true })
  businessLicenseCopy?: string;

  @Column({ nullable: true })
  isRepresentative?: boolean;

  @Column({ nullable: true })
  instagramUrl?: string;

  @Column({ nullable: true })
  etcLinkUrl?: string;

  @Column()
  status: TeaHouseStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  toDomain(): TeaHouse {
    return new TeaHouse(this);
  }
}
