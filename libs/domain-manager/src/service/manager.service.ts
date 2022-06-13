import { RegisterUserCommand } from '@domain/domain-user/dto/user.command';
import { Injectable } from '@nestjs/common';
import { Manager } from '../entity/manager';

export interface ManagerService {
  registerUser(command: RegisterUserCommand): Promise<Manager>;
}

@Injectable()
export class ManagerServiceImpl implements ManagerService {
  async registerUser(command: RegisterUserCommand): Promise<Manager> {}
}
