import { ulid } from 'ulid';
export class TeaHouse {
  teaHouseId: string;
  managerId?: string;
  name: string;
  teaHouseAddress: TeaHouseAddress;
  teaHouseContractNumber?: string;
  categoryOfBusiness: string;
  schedule: TeaHouseSchedule;
  businessLicenseCopy?: string;
  isRepresentative?: boolean;
  instagramUrl?: string;
  etcLinkUrl?: string;
  status: TeaHouseStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor({
    teaHouseId = ulid(),
    name,
    teaHouseAddress,
    teaHouseContractNumber,
    categoryOfBusiness,
    schedule,
    managerId,
    businessLicenseCopy,
    isRepresentative,
    instagramUrl,
    etcLinkUrl,
    createdAt,
    updatedAt,
    deletedAt,
    status,
  }: {
    teaHouseId?: string;
    managerId?: string;
    name: string;
    teaHouseAddress: TeaHouseAddress;
    teaHouseContractNumber?: string;
    categoryOfBusiness: string;
    schedule: TeaHouseSchedule;
    businessLicenseCopy?: string;
    isRepresentative?: boolean;
    instagramUrl?: string;
    etcLinkUrl?: string;
    status: TeaHouseStatus;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }) {
    this.teaHouseId = teaHouseId;
    this.managerId = managerId;
    this.name = name;
    this.teaHouseAddress = teaHouseAddress;
    this.teaHouseContractNumber = teaHouseContractNumber;
    this.categoryOfBusiness = categoryOfBusiness;
    this.schedule = schedule;
    this.businessLicenseCopy = businessLicenseCopy;
    this.isRepresentative = isRepresentative;
    this.instagramUrl = instagramUrl;
    this.etcLinkUrl = etcLinkUrl;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  requestRegisterManager({
    managerId,
    isRepresentative,
    businessLicenseCopy,
  }: {
    managerId: string;
    isRepresentative: boolean;
    businessLicenseCopy: string;
  }) {
    this.managerId = managerId;
    this.status = TeaHouseStatus.관리등록신청;
    this.isRepresentative = isRepresentative;
    this.businessLicenseCopy = businessLicenseCopy;
  }

  completeRegister() {
    this.status = TeaHouseStatus.등록완료;
  }

  closeTeaHouse() {
    this.status = TeaHouseStatus.폐점;
    this.deletedAt = new Date();
  }

  update(newTeaHouse: ModifyTeaHouse) {
    if (newTeaHouse.name) this.name = newTeaHouse.name;
    if (newTeaHouse.teaHouseAddress)
      this.teaHouseAddress = newTeaHouse.teaHouseAddress;
    if (newTeaHouse.teaHouseContractNumber)
      this.teaHouseContractNumber = newTeaHouse.teaHouseContractNumber;
    if (newTeaHouse.categoryOfBusiness)
      this.categoryOfBusiness = newTeaHouse.categoryOfBusiness;
    if (newTeaHouse.schedule) this.schedule = newTeaHouse.schedule;
    if (newTeaHouse.instagramUrl) this.instagramUrl = newTeaHouse.instagramUrl;
    if (newTeaHouse.etcLinkUrl) this.etcLinkUrl = newTeaHouse.etcLinkUrl;
  }
}

export class TeaHouseSchedule {
  monday: {
    isWork: boolean;
    startTime: string;
    endTime: string;
  };
  tuesday: {
    isWork: boolean;
    startTime: string;
    endTime: string;
  };
  wednesday: {
    isWork: boolean;
    startTime: string;
    endTime: string;
  };
  thursday: {
    isWork: boolean;
    startTime: string;
    endTime: string;
  };
  friday: {
    isWork: boolean;
    startTime: string;
    endTime: string;
  };
  saturday: {
    isWork: boolean;
    startTime: string;
    endTime: string;
  };
  sunday: {
    isWork: boolean;
    startTime: string;
    endTime: string;
  };
  etc?: {
    contents: string;
  };
}

export class TeaHouseAddress {
  address: string;
  detailAddress: string;
  postcode: string;
}

export enum TeaHouseStatus {
  시스템등록 = 'SYSTEM',
  관리등록신청 = 'REQUEST',
  등록완료 = 'REGISTER',
  폐점 = 'CLOSE',
}

export class ModifyTeaHouse {
  managerId?: string;
  name?: string;
  teaHouseAddress?: TeaHouseAddress;
  teaHouseContractNumber?: string;
  categoryOfBusiness?: string;
  schedule?: TeaHouseSchedule;
  businessLicenseCopy?: string;
  isRepresentative?: boolean;
  instagramUrl?: string;
  etcLinkUrl?: string;
}
