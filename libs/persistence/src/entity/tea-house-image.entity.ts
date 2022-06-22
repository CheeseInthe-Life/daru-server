import { ImageKindEnum } from '@domain/domain/tea-house/entity/tea-house-image';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tea_house_image')
export class TeaHouseImageEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  teaHouseId: string;

  @Column()
  imageCopy: string;

  @Column()
  imageKind: ImageKindEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
