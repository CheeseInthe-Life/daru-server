import { ProviderChannelEnum } from '@domain/domain-user/entity/user';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryColumn()
  userId: string;
  @Column()
  providerId: string;
  @Column()
  providerName: ProviderChannelEnum;
  @Column()
  email: string;
  @Column()
  nickname: string;
}
