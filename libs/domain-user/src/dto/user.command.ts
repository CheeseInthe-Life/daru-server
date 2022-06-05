import { User } from '../entity/user';

export class RegisterUserCommand {
  providerId: string;
  email: string;
  nickname: string;

  toUser(): User {
    return User.of({
      providerId: this.providerId,
      email: this.email,
      nickname: this.nickname,
    });
  }
}
