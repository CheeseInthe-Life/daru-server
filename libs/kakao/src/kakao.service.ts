import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { KakaoServiceException } from './kakao-server-exception';
import { UnauthorizedExceptionMessage } from 'apps/customer/src/presentation/common/constant/error-message';

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
      /**
       * -1	카카오 플랫폼 서비스의 일시적 내부 장애 상태
       * 토큰을 강제 만료(폐기) 또는 로그아웃 처리하지 않고 일시적인 장애 메시지로 처리 권장	400
       * -2	필수 인자가 포함되지 않은 경우나 호출 인자값의 데이터 타입이 적절하지 않거나 허용된 범위를 벗어난 경우
       * 요청 시 주어진 액세스 토큰 정보가 잘못된 형식인 경우로 올바른 형식으로 요청했는지 확인	400
       * -401	유효하지 않은 앱키나 액세스 토큰으로 요청한 경우
       * 토큰 값이 잘못되었거나 만료되어 유효하지 않은 경우로 토큰 갱신 필요	401
       */
      const kakaoErrorCode = error.response.data.code;

      switch (kakaoErrorCode) {
        case -1:
          throw new KakaoServiceException();
        case -2 || -401:
          throw new UnauthorizedException(
            UnauthorizedExceptionMessage.invalidToken,
          );
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
