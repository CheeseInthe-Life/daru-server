export enum ProviderChannelEnum {
  카카오 = 'KAKAO',
  애플 = 'APPLE',
}

export class User {
  userId: string;
  providerId: string;
  providerName: ProviderChannelEnum;
  email: string;
  nickname: string;

  private constructor() {
    return;
  }

  static of({
    userId,
    nickname,
    email,
    providerId,
    providerName,
  }: {
    userId: string;
    nickname: string;
    email: string;
    providerId: string;
    providerName: ProviderChannelEnum;
  }): User {
    const user = new User();
    user.userId = userId;
    user.nickname = nickname;
    user.email = email;
    user.providerId = providerId;
    user.providerName = providerName;
    return user;
  }
}
