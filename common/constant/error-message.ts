export class UnauthorizedExceptionMessage {
  static notRegisterUser = '가입되지 않은 계정이에요';
  static invalidToken = '유효하지 않은 토큰이에요';
}

export class CellphoneVerificationExceptionMessage {
  static expired = '인증번호가 만료되었어요';
  static invalid = '인증번호가 일치하지 않아요';
  static notFound = '요청을 찾을 수 없어요';
}
