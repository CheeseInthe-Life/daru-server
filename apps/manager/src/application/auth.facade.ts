import { ManagerDIToken } from '@domain/domain/manager/di/manager.token';
import { ManagerService } from '@domain/domain/manager/service/manager.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthFacade {
  constructor(
    @Inject(ManagerDIToken.ManagerService)
    private readonly managerService: ManagerService,
  ) {}
}
