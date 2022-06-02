import { Inject, Injectable } from '@nestjs/common';
import { UserDIToken } from '../di/domain-user.token';
import { RegisterUserCommand } from '../dto/user.command';
import { RetrieveUserByUserId } from '../dto/user.criteria';
import { UserMainInfo } from '../dto/user.info';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class DomainUserService {
  constructor(
    @Inject(UserDIToken.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async retrieveUserByUserId({
    userId,
  }: RetrieveUserByUserId): Promise<UserMainInfo> {
    return UserMainInfo.of(
      await this.userRepository.findUserByUserId({ userId }),
    );
  }

  async retrieveUserList(): Promise<Array<UserMainInfo>> {
    return (await this.userRepository.findUserList()).map((user) =>
      UserMainInfo.of(user),
    );
  }

  async registerUser(command: RegisterUserCommand): Promise<UserMainInfo> {
    return UserMainInfo.of(await this.userRepository.store(command.toUser()));
  }
}
