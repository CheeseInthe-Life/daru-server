export class TeaHouseDIToken {
  //Service
  public static readonly TeaHouseService: unique symbol =
    Symbol('TeaHouseService');

  //Repository
  public static readonly TeaHouseRepository: unique symbol =
    Symbol('TeaHouseRepository');
}
