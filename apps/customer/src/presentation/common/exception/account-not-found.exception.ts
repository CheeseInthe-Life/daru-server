import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message ?? '계정을 찾을 수 없습니다.', HttpStatus.BAD_REQUEST);
  }
}
