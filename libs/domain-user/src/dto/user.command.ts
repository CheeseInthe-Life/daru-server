import { ProviderChannelEnum, User } from '../entity/user';

export class RegisterUserCommand {
  userId: string;
  providerId: string;
  providerName: ProviderChannelEnum;
  email: string;
  nickname: string;

  toUser(): User {
    return User.of({
      userId: this.userId,
      providerId: this.providerId,
      providerName: this.providerName,
      email: this.email,
      nickname: this.nickname,
    });
  }
}
