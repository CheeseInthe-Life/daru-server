import { User } from '../entity/user';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class UserMainInfo {
  userId: string;
  providerId: string;
  email: string;
  nickname: string;

  private constructor({ userId, providerId, email, nickname }: User) {
    this.userId = userId;
    this.providerId = providerId;
    this.email = email;
    this.nickname = nickname;
  }

  static of(user: User) {
    return new UserMainInfo(user);
  }
}
