import { UserService } from '@domain/domain-user';
import { UserDIToken } from '@domain/domain-user/di/domain-user.token';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserFacade {
  constructor(
    @Inject(UserDIToken.UserService)
    private readonly userService: UserService,
  ) {}

  async retrieveUserList() {
    return this.userService.retrieveUserList();
  }
}
