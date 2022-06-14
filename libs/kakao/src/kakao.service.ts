import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { KakaoServiceException } from './kakao-server-exception';

export interface KakaoResponse {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: { nickname: string };
  };
}

@Injectable()
export class KakaoService {
  constructor(private readonly httpService: HttpService) {}

  async getAccount({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<KakaoResponse> {
    try {
      const url = 'https://kapi.kakao.com/v2/user/me';
      const headers: AxiosRequestHeaders = {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      };

      const config: AxiosRequestConfig = {
        headers,
      };

      const { data } = await lastValueFrom(
        this.httpService.post(url, null, config),
      );

      return data;
    } catch (error: any) {
      Logger.error(error);
      throw new KakaoServiceException();
    }
  }
}
