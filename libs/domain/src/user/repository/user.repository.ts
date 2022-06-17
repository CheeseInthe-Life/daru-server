import { User } from '../entity/user';

export interface UserRepository {
  findUserByUserId(criteria: { userId: string }): Promise<User>;
  findUserByNickname(criteria: { nickname: string }): Promise<User>;
  findUserList(): Promise<Array<User>>;
  store(user: User): Promise<User>;
}
