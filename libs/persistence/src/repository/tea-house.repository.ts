import { TeaHouse } from '@domain/domain/tea-house/entity/tea-house';
import { TeaHouseRepository } from '@domain/domain/tea-house/repository/tea-house-category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { TeaHouseEntity } from '../entity/tea-house.entity';

@EntityRepository(TeaHouseEntity)
export class TeaHouseRepositoryImpl implements TeaHouseRepository {
  constructor(
    @InjectRepository(TeaHouseEntity)
    private readonly teaHouseRepository: Repository<TeaHouseEntity>,
  ) {}

  async store(teaHouse: TeaHouse): Promise<TeaHouse> {
    return this.teaHouseRepository.save(teaHouse);
  }

  async findById(teaHouseId: string): Promise<TeaHouse> {
    return (
      await this.teaHouseRepository.findOneOrFail({ teaHouseId })
    ).toDomain();
  }

  async findAll(): Promise<TeaHouse[]> {
    return (await this.teaHouseRepository.find()).map(
      (teaHouse: TeaHouseEntity) => teaHouse.toDomain(),
    );
  }
}
