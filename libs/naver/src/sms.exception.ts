import { HttpException } from '@nestjs/common';
import { NaverSendSMSResultStatusCode } from './notification.service';

export class SMSException extends HttpException {
  constructor(statusCode: NaverSendSMSResultStatusCode, message?: string) {
    super(message ?? '', +statusCode);
  }
}
