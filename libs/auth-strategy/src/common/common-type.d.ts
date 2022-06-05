import { ProviderChannelEnum } from '@domain/domain-user/entity/user';

export interface SignInUser {
  providerId: string;
  providerName: ProviderChannelEnum;
  user?: User;
}
