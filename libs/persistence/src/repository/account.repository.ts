import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { AccountEntity, ProviderChannelEnum } from '../entity/account.entity';

@EntityRepository(AccountEntity)
export class AccountRepositoryImpl {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly AccountRepository: Repository<AccountEntity>,
  ) {}

  async store(Account: AccountEntity): Promise<AccountEntity> {
    return this.AccountRepository.save(Account);
  }

  async findAccountByProviderIdAndProviderName({
    providerId,
    providerName,
  }: {
    providerId: string;
    providerName: ProviderChannelEnum;
  }): Promise<AccountEntity> {
    return this.AccountRepository.findOneOrFail({
      providerId,
      providerName,
    });
  }
}
