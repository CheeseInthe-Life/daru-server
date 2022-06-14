import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';

const { KAKAO_CLIENT_KEY, KAKAO_CLIENT_SECRET_KEY, KAKAO_REDIRECT_URL } =
  process.env;
export interface KakaoAccount {
  id: number;
  connected_at: string;
}

export interface KakaoProfile {
  provider: string;
  id: number;
  username: string;
  displayName: string;
  _json: KakaoAccount;
}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: KAKAO_CLIENT_KEY as string,
      clientSecret: KAKAO_CLIENT_SECRET_KEY as string,
      callbackURL: KAKAO_REDIRECT_URL as string,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    kakaoProfile: KakaoProfile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    return done(null, {
      accessToken,
      refreshToken,
    });
  }
}
