import { Module } from '@nestjs/common';
import { AuthFacade } from '../application/auth.facade';
import { AuthController } from '../presentation/auth/api/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthFacade],
})
export class AuthModule {}
