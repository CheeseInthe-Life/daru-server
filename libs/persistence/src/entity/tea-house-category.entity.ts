import { TeaHouseCategoryStatusEnum } from '@domain/domain/tea-house/entity/tea-house-category';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tea_house_category')
export class TeaHouseCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TeaHouseCategoryStatusEnum,
  })
  status: TeaHouseCategoryStatusEnum;
}
