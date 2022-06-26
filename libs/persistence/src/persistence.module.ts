import { TeaHouseDIToken } from '@domain/domain/tea-house/di/tea-house.token';
import { UserDIToken } from '@domain/domain/user/di/user.token';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account.entity';
import { CellphoneVerificationEntity } from './entity/cellphone-verification.entity';
import { TeaHouseEntity } from './entity/tea-house.entity';
import { UserEntity } from './entity/user.entity';
import { AccountRepositoryImpl } from './repository/account.repository';
import { CellphoneVerificationRepository } from './repository/cellphone-verification.repository';
import { TeaHouseRepositoryImpl } from './repository/tea-house.repository';
import { UserRepositoryImpl } from './repository/user.repository';

export class InfraDIToken {
  static readonly CellphoneVerificationRepository = Symbol(
    'CellphoneVerificationRepository',
  );
}

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
  {
    provide: InfraDIToken.CellphoneVerificationRepository,
    useClass: CellphoneVerificationRepository,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AccountEntity,
      TeaHouseEntity,
      CellphoneVerificationEntity,
    ]),
  ],
  providers: [...persistenceProviders],
  exports: [TypeOrmModule, ...persistenceProviders],
})
export class PersistenceModule {}
