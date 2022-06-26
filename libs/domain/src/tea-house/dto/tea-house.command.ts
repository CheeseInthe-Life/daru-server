import {
  TeaHouse,
  TeaHouseAddress,
  TeaHouseCoordinate,
  TeaHouseSchedule,
  TeaHouseStatus,
} from '../entity/tea-house';

export class TeaHouseRegisterRequestCommand {
  managerId: string;
  name: string;
  teaHouseId?: string;
  teaHouseAddress: TeaHouseAddress;
  teaHouseContractNumber?: string;
  categoryOfBusiness: string;
  schedule: TeaHouseSchedule;
  businessLicenseCopy: string;
  isRepresentative: boolean;
  instagramUrl?: string;
  etcLinkUrl?: string;
  coordinate?: TeaHouseCoordinate;

  toEntity(): TeaHouse {
    return new TeaHouse({
      teaHouseId: this.teaHouseId,
      managerId: this.managerId,
      name: this.name,
      teaHouseAddress: this.teaHouseAddress,
      teaHouseContractNumber: this.teaHouseContractNumber,
      categoryOfBusiness: this.categoryOfBusiness,
      schedule: this.schedule,
      instagramUrl: this.instagramUrl,
      etcLinkUrl: this.etcLinkUrl,
      businessLicenseCopy: this.businessLicenseCopy,
      isRepresentative: this.isRepresentative,
      status: TeaHouseStatus.관리등록신청,
      coordinate: this.coordinate,
    });
  }
}

export class TeaHouseRegisterCommand {
  managerId?: string;
  name: string;
  teaHouseAddress: TeaHouseAddress;
  teaHouseContractNumber?: string;
  categoryOfBusiness: string;
  schedule: TeaHouseSchedule;
  businessLicenseCopy?: string;
  instagramUrl?: string;
  etcLinkUrl?: string;

  toEntity(): TeaHouse {
    return new TeaHouse({
      name: this.name,
      teaHouseAddress: this.teaHouseAddress,
      teaHouseContractNumber: this.teaHouseContractNumber,
      categoryOfBusiness: this.categoryOfBusiness,
      schedule: this.schedule,
      instagramUrl: this.instagramUrl,
      etcLinkUrl: this.etcLinkUrl,
      status: TeaHouseStatus.시스템등록,
      businessLicenseCopy: this.businessLicenseCopy,
    });
  }
}

export class TeaHouseUpdateCommand {
  teaHouseId: string;
  managerId?: string;
  name?: string;
  teaHouseAddress: TeaHouseAddress;
  teaHouseContractNumber?: string;
  categoryOfBusiness?: string;
  schedule?: TeaHouseSchedule;
  businessLicenseCopy?: string;
  isRepresentative?: boolean;
  instagramUrl?: string;
  etcLinkUrl?: string;
}
