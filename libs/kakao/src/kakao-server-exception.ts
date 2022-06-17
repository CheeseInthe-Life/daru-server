import { HttpException, HttpStatus } from '@nestjs/common';

export class KakaoServiceException extends HttpException {
  constructor(message?: string) {
    super(
      message ?? '카카오 서비스에 일시적인 장애가 있습니다.',
      HttpStatus.BAD_GATEWAY,
    );
  }
}
