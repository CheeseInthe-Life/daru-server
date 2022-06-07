import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyRegisterException extends HttpException {
  constructor(message?: string) {
    super(message ?? '이미 가입된 유저입니다.', HttpStatus.BAD_REQUEST);
    HttpException.captureStackTrace(this);
  }
}
