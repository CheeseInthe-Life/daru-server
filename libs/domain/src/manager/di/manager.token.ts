export class ManagerDIToken {
  //Service
  public static readonly ManagerService: unique symbol =
    Symbol('ManagerService');

  //Repository
  public static readonly ManagerRepository: unique symbol =
    Symbol('ManagerRepository');
}
