export enum ImageKindEnum {
  메뉴판 = 'MENU_BOARD',
}

export class TeaHouseImage {
  id: string;
  teaHouseId: string;
  imageCopy: string;
  imageKind: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
