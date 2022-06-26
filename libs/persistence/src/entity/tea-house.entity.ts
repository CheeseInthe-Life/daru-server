import {
  CityEnum,
  TeaHouse,
  TeaHouseSchedule,
  TeaHouseStatus,
} from '@domain/domain/tea-house/entity/tea-house';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

class TeaHouseCoordinate {
  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;
}

class TeaHouseAddress {
  @Column()
  address: string;

  @Column()
  detailAddress: string;

  @Column()
  postcode: string;

  @Column({ type: 'enum', enum: CityEnum })
  city: CityEnum;
}

@Entity('tea_house')
export class TeaHouseEntity {
  @PrimaryColumn()
  teaHouseId: string;

  @Column({ nullable: true })
  managerId?: string;

  @Column()
  name: string;

  @Column(() => TeaHouseAddress, {
    prefix: false,
  })
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

  @Column(() => TeaHouseCoordinate, {
    prefix: false,
  })
  coordinate?: TeaHouseCoordinate;

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
