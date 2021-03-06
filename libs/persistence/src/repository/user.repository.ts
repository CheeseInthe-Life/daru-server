import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { UserRepository } from '@domain/domain-user/repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { User } from '@domain/domain-user/entity/user';

@EntityRepository(UserEntity)
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findUserByNickname({ nickname }: { nickname: string }): Promise<User> {
    return await this.userRepository.findOneOrFail({
      nickname,
    });
  }

  async findUserByProviderId({
    providerId,
  }: {
    providerId: string;
  }): Promise<User> {
    return await this.userRepository.findOneOrFail({
      providerId,
    });
  }

  async findUserByUserId({ userId }: { userId: string }): Promise<User> {
    return User.of(await this.userRepository.findOneOrFail({ userId }));
  }

  async findUserList(): Promise<User[]> {
    const userEntityList: UserEntity[] = await this.userRepository.find();
    return userEntityList.map((userEntity) => {
      return User.of(userEntity);
    });
  }

  async store(user: User): Promise<User> {
    return User.of(await this.userRepository.save(user));
  }
}
