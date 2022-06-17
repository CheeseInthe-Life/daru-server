import { Injectable } from '@nestjs/common';
import { RegisterManagerCommand } from '../dto/manager.command';
import { Manager } from '../entity/manager';

export interface ManagerService {
  registerManager(command: RegisterManagerCommand): Promise<Manager>;
}

@Injectable()
export class ManagerServiceImpl implements ManagerService {
  async registerManager(command: RegisterManagerCommand): Promise<Manager> {
    return command.toManager();
  }
}
