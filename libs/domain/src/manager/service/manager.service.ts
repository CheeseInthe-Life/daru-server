import { Inject, Injectable } from '@nestjs/common';
import { ManagerDIToken } from '../di/manager.token';
import { RegisterManagerCommand } from '../dto/manager.command';
import { Manager } from '../entity/manager';
import { ManagerRepository } from '../repository/manager.repository';

export interface ManagerService {
  registerManager(command: RegisterManagerCommand): Promise<Manager>;
}

@Injectable()
export class ManagerServiceImpl implements ManagerService {
  constructor(
    @Inject(ManagerDIToken.ManagerRepository)
    private readonly managerRepository: ManagerRepository,
  ) {}

  async registerManager(command: RegisterManagerCommand): Promise<Manager> {
    const manager = command.toEntity();
    manager.hashPassword();

    return await this.managerRepository.store(manager);
  }
}
