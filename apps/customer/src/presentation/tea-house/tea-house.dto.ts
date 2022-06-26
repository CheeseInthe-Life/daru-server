import {
  TeaHouse,
  TeaHouseStatus,
} from '@domain/domain/tea-house/entity/tea-house';
import { ApiProperty } from '@nestjs/swagger';

export class TeaHouseAddressDto {
  @ApiProperty()
  address: string;
  @ApiProperty()
  detailAddress: string;
  @ApiProperty()
  postcode: string;
  @ApiProperty()
  city: string;
}

class ScheduleDto {
  @ApiProperty()
  isWork: boolean;
  @ApiProperty()
  startTime: string;
  @ApiProperty()
  endTime: string;
}

export class TeaHouseScheduleDto {
  @ApiProperty()
  monday: ScheduleDto;
  @ApiProperty()
  tuesday: ScheduleDto;
  @ApiProperty()
  wednesday: ScheduleDto;
  @ApiProperty()
  thursday: ScheduleDto;
  @ApiProperty()
  friday: ScheduleDto;
  @ApiProperty()
  saturday: ScheduleDto;
  @ApiProperty()
  sunday: ScheduleDto;
  @ApiProperty()
  etc?: {
    contents: string;
  };
}

export class TeaHouseMainDto {
  @ApiProperty()
  teaHouseId: string;

  @ApiProperty()
  managerId?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  teaHouseAddress: TeaHouseAddressDto;

  @ApiProperty()
  teaHouseContractNumber?: string;

  @ApiProperty()
  categoryOfBusiness: string;

  @ApiProperty()
  schedule: TeaHouseScheduleDto;

  @ApiProperty()
  businessLicenseCopy?: string;

  @ApiProperty()
  isRepresentative?: boolean;

  @ApiProperty()
  instagramUrl?: string;

  @ApiProperty()
  etcLinkUrl?: string;

  @ApiProperty()
  status: TeaHouseStatus;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  deletedAt?: Date;

  constructor(teaHouse: TeaHouse) {
    this.teaHouseId = teaHouse.teaHouseId;
    this.managerId = teaHouse.managerId;
    this.name = teaHouse.name;
    this.teaHouseAddress = teaHouse.teaHouseAddress;
    this.teaHouseContractNumber = teaHouse.teaHouseContractNumber;
    this.categoryOfBusiness = teaHouse.categoryOfBusiness;
    this.schedule = teaHouse.schedule;
    this.businessLicenseCopy = teaHouse.businessLicenseCopy;
    this.isRepresentative = teaHouse.isRepresentative;
    this.instagramUrl = teaHouse.instagramUrl;
    this.etcLinkUrl = teaHouse.etcLinkUrl;
    this.status = teaHouse.status;
    this.createdAt = teaHouse.createdAt;
    this.updatedAt = teaHouse.updatedAt;
    this.deletedAt = teaHouse.deletedAt;
  }
}
