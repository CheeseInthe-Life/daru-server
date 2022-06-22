import { UserDIToken } from '@domain/domain/user/di/user.token';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account.entity';
import { UserEntity } from './entity/user.entity';
import { AccountRepositoryImpl } from './repository/account.repository';
import { UserRepositoryImpl } from './repository/user.repository';

const persistenceProviders: Provider[] = [
  {
    provide: UserDIToken.UserRepository,
    useClass: UserRepositoryImpl,
  },
  {
    provide: UserDIToken.AccountRepository,
    useClass: AccountRepositoryImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity])],
  providers: [...persistenceProviders],
  exports: [
    TypeOrmModule,
    UserDIToken.UserRepository,
    UserDIToken.AccountRepository,
  ],
})
export class PersistenceModule {}
