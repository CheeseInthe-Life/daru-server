import { User } from '../entity/user';

export interface UserRepository {
  findUserByUserId({ userId }: { userId: string }): Promise<User>;
  findUserList(): Promise<Array<User>>;
  store(user: User): Promise<User>;
}
