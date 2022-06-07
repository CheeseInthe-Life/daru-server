import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { AccountEntity, ProviderChannelEnum } from '../entity/account.entity';

@EntityRepository(AccountEntity)
export class AccountRepositoryImpl {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async store(Account: AccountEntity): Promise<AccountEntity> {
    return this.accountRepository.save(Account);
  }

  async findAccountByAccountId({ accountId }: { accountId: number }) {
    return this.accountRepository.findOneOrFail({ accountId });
  }

  async findAccountByProviderIdAndProviderName({
    providerId,
    providerName,
  }: {
    providerId: string;
    providerName: ProviderChannelEnum;
  }): Promise<AccountEntity> {
    return this.accountRepository.findOneOrFail({
      providerId,
      providerName,
    });
  }
}
