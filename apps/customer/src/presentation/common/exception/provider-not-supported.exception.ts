import { HttpException, HttpStatus } from '@nestjs/common';

export class ProviderNotSupportedException extends HttpException {
  constructor(message?: string) {
    super(
      message ?? '현재 지원하지 않는 provider 입니다.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
