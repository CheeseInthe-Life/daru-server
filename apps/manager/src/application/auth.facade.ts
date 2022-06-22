import { ManagerDIToken } from '@domain/domain/manager/di/manager.token';
import { RegisterManagerCommand } from '@domain/domain/manager/dto/manager.command';
import { ManagerService } from '@domain/domain/manager/service/manager.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthFacade {
  constructor(
    @Inject(ManagerDIToken.ManagerService)
    private readonly managerService: ManagerService,
  ) {}

  async signUp(command: RegisterManagerCommand): Promise<any> {
    return await this.managerService.registerManager(command);
  }
}
