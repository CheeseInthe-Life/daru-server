import { UserDIToken } from '@domain/domain-user/di/domain-user.token';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepositoryImpl } from './repository/user.repository';

const persistenceProviders: Provider[] = [
  {
    provide: UserDIToken.UserRepository,
    useClass: UserRepositoryImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [...persistenceProviders],
  exports: [TypeOrmModule, UserDIToken.UserRepository],
})
export class PersistenceModule {}
