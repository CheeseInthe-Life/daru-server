import { UserGenderEnum } from '@domain/domain/user/entity/user';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'user',
})
@Index(['nickname'], { unique: true })
export class UserEntity {
  @PrimaryColumn({ length: 32 })
  userId: string;

  @Column({
    length: 16,
  })
  name: string;

  @Column({
    length: 16,
    unique: true,
  })
  nickname: string;

  @Column({
    nullable: true,
    length: 8,
    type: 'varchar',
  })
  gender: UserGenderEnum | null;

  @Column({
    length: 4,
  })
  birthYear: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
