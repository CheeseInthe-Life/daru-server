import { User } from '../entity/user';

export interface UserRepository {
  findUserByProviderId(criteria: { providerId: string }): Promise<User>;
  findUserByUserId(criteria: { userId: string }): Promise<User>;
  findUserList(): Promise<Array<User>>;
  store(user: User): Promise<User>;
}
