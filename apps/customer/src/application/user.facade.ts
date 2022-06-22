import { UserDIToken } from '@domain/domain/user/di/user.token';
import { UserService } from '@domain/domain/user/service/user.service';
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
