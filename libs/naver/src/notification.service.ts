import 'dotenv/config';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import * as cryptoJs from 'crypto-js';
import { lastValueFrom } from 'rxjs';
import { SMSException } from './sms.exception';
import {
  NotificationService,
  SendSMSResult,
  SMS,
} from '@domain/domain/interface/service/notification.service';

const {
  NAVER_ACCESS_KEY,
  NAVER_SECRET,
  NAVER_SMS_SERVICE_ID,
  NAVER_SMS_FROM_AUTH_NUMBER,
} = process.env;

interface NaverSendSMSRequestBody {
  type: 'SMS';
  contentType?: 'COMM' | 'AD'; //default COMM
  countryCode?: string; // default 82
  from: string; // 발신 번호
  content: string; // 기본 메시지 최대 80 byte
  messages: SMS[]; // 최대 1000개
  reserveTime?: string; // 메시지 발송 예약 (format: yyyy-MM-dd HH:mm)
  reserveTimeZone?: string; // 예약 일시 타임존 (default: Asia/Seoul)
}

interface NaverSendSMSResult {
  requestId: string;
  requestTime: string;
  statusCode: NaverSendSMSResultStatusCode;
  statusName: 'success' | 'fail';
}

export type NaverSendSMSResultStatusCode =
  | '202'
  | '400'
  | '401'
  | '403'
  | '404'
  | '429'
  | '500';

@Injectable()
export class NotificationServiceImpl implements NotificationService {
  private readonly smsHost: string = 'https://sens.apigw.ntruss.com';
  private readonly path = `/sms/v2/services/${NAVER_SMS_SERVICE_ID}/messages`;

  constructor(private readonly httpService: HttpService) {}

  async sendSms({ to, content }: SMS): Promise<SendSMSResult> {
    const sendHost = `${this.smsHost}${this.path}`;
    const requestTimestamp = Date.now().toString();
    const signature = this.makeSignature(requestTimestamp);

    const data: NaverSendSMSRequestBody = {
      type: 'SMS',
      content,
      from: NAVER_SMS_FROM_AUTH_NUMBER as string,
      messages: [
        {
          to,
          content,
        },
      ],
    };

    const axiosConfig: AxiosRequestConfig = {
      method: 'POST',
      url: sendHost,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': NAVER_ACCESS_KEY as string,
        'x-ncp-apigw-timestamp': requestTimestamp,
        'x-ncp-apigw-signature-v2': signature,
      },
      data,
    };

    const result = await lastValueFrom(this.httpService.request(axiosConfig));

    const naverResult: NaverSendSMSResult = result.data;

    if (naverResult.statusCode !== '202')
      throw new SMSException(naverResult.statusCode, naverResult.statusName);

    return { result: naverResult.statusName };
  }

  private makeSignature(requestTimestamp: string) {
    const space = ' '; // one space
    const newLine = '\n'; // new line
    const method = 'POST'; // method
    const url = this.path; // url (include query string)
    const timestamp = requestTimestamp; // current timestamp (epoch)
    const accessKey = NAVER_ACCESS_KEY as string; // access key id (from portal or Sub Account)
    const secretKey = NAVER_SECRET as string; // secret key (from portal or Sub Account)

    const hmac = cryptoJs.algo.HMAC.create(cryptoJs.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize();

    return hash.toString(cryptoJs.enc.Base64);
  }
}
