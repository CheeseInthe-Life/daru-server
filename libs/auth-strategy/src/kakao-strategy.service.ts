import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class KakaoStrategyService extends PassportStrategy(Strategy, 'kakao') {}
