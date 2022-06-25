import { TeaHouseDIToken } from '@domain/domain/tea-house/di/tea-house.token';
import { UserDIToken } from '@domain/domain/user/di/user.token';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account.entity';
import { TeaHouseEntity } from './entity/tea-house.entity';
import { UserEntity } from './entity/user.entity';
import { AccountRepositoryImpl } from './repository/account.repository';
import { TeaHouseRepositoryImpl } from './repository/tea-house.repository';
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
  {
    provide: TeaHouseDIToken.TeaHouseRepository,
    useClass: TeaHouseRepositoryImpl,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccountEntity, TeaHouseEntity]),
  ],
  providers: [...persistenceProviders],
  exports: [TypeOrmModule, ...persistenceProviders],
})
export class PersistenceModule {}
