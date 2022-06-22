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

export class TeaHouse {
  teaHouseId: string;
  managerId: string;
  name: string;
  teaHouseAddress: TeaHouseAddress;
  teaHouseContractNumber: string;
  categoryOfBusiness: string;
  isRepresentative: boolean;
  schedule: TeaHouseSchedule;
  businessLicenseCopy: string;
  instagramUrl: string;
  etcLinkUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
