export class UserDIToken {
  // Service
  public static readonly UserService: unique symbol = Symbol('UserService');

  // Repository
  public static readonly UserRepository: unique symbol =
    Symbol('UserRepository');

  public static readonly AccountRepository: unique symbol =
    Symbol('AccountRepository');
}
