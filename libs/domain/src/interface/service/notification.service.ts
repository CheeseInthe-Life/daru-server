export interface NotificationService {
  sendSms(sms: SMS): Promise<SendSMSResult>;
}

export interface SMS {
  to: string; // 수신 번호
  content: string; // 메시지 최대 80 byte
}

export interface SendSMSResult {
  result: 'success' | 'fail';
}
