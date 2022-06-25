import { TeaHouse } from '@domain/domain/tea-house/entity/tea-house';
import { PickType } from '@nestjs/swagger';

export class TeaHouseMainDto extends PickType(TeaHouse, [
  'teaHouseId',
  'managerId',
  'name',
  'teaHouseAddress',
  'teaHouseContractNumber',
  'categoryOfBusiness',
  'schedule',
  'businessLicenseCopy',
  'isRepresentative',
  'instagramUrl',
  'etcLinkUrl',
  'status',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {
  constructor(teaHouse: TeaHouse) {
    super();
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
