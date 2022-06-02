import { ProviderChannelEnum, User } from '../entity/user';

export class UserMainInfo {
  userId: string;
  providerId: string;
  providerName: ProviderChannelEnum;
  email: string;
  nickname: string;

  private constructor({
    userId,
    providerId,
    providerName,
    email,
    nickname,
  }: User) {
    this.userId = userId;
    this.providerId = providerId;
    this.providerName = providerName;
    this.email = email;
    this.nickname = nickname;
  }

  static of(user: User) {
    return new UserMainInfo(user);
  }
}
