export class UserDIToken {
  // Repository
  public static readonly UserRepository: unique symbol =
    Symbol('UserRepository');

  public static readonly AccountRepository: unique symbol =
    Symbol('AccountRepository');
}
