import { Inject, Injectable } from '@nestjs/common';
import { UserDIToken } from '../di/domain-user.token';
import { RegisterUserCommand } from '../dto/user.command';
import {
  RetrieveUserByNickname,
  RetrieveUserByUserId,
} from '../dto/user.criteria';
import { UserMainInfo } from '../dto/user.info';
import { UserRepository } from '../repository/user.repository';

export interface UserService {
  retrieveUserByNickname(
    criteria: RetrieveUserByNickname,
  ): Promise<UserMainInfo>;
  retrieveUserByUserId(criteria: RetrieveUserByUserId): Promise<UserMainInfo>;
  retrieveUserList(): Promise<Array<UserMainInfo>>;
  registerUser(command: RegisterUserCommand): Promise<UserMainInfo>;
}

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject(UserDIToken.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async retrieveUserByNickname(
    criteria: RetrieveUserByNickname,
  ): Promise<UserMainInfo> {
    return UserMainInfo.of(
      await this.userRepository.findUserByNickname({
        nickname: criteria.nickname,
      }),
    );
  }

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
