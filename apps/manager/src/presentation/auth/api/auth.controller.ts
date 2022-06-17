import { Controller } from '@nestjs/common';
import { AuthFacade } from 'apps/manager/src/application/auth.facade';

@Controller()
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}
}
