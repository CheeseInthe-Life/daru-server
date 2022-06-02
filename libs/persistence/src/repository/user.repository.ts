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
  async findUserByUserId({ userId }: { userId: string }): Promise<User> {
    const userEntity: UserEntity = await this.userRepository.findOneOrFail({
      where: { userId },
    });
    return User.of(userEntity);
  }
  async findUserList(): Promise<User[]> {
    const userEntityList: UserEntity[] = await this.userRepository.find();
    return userEntityList.map((userEntity) => {
      return User.of(userEntity);
    });
  }
  async store(user: User): Promise<User> {
    const userEntity: UserEntity = await this.userRepository.save(user);
    return User.of(userEntity);
  }
}
