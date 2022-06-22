export enum TeaHouseCategoryStatusEnum {
  활성 = 'ACTIVE',
  비활성 = 'INACTIVE',
  요청 = 'REQUEST',
}

export class TeaHouseCategoryEntity {
  id: number;
  name: string;
  status: TeaHouseCategoryStatusEnum;
}
