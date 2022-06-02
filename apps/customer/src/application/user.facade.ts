import { DomainUserService } from '@domain/domain-user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFacade {
  constructor(private readonly userService: DomainUserService) {}

  async retrieveUserList() {
    return this.userService.retrieveUserList();
  }
}
