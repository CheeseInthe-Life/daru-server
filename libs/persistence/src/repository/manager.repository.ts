import { ManagerByIdCriteria } from '@domain/domain/manager/dto/manager.ciriteria';
import { Manager } from '@domain/domain/manager/entity/manager';
import { ManagerRepository } from '@domain/domain/manager/repository/manager.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { ManagerEntity } from '../entity/manager.entity';

@EntityRepository(ManagerEntity)
export class ManagerRepositoryImpl implements ManagerRepository {
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly managerRepository: Repository<ManagerEntity>,
  ) {}

  async store(manager: Manager): Promise<Manager> {
    return (await this.managerRepository.save(manager)).toDomain();
  }

  async findById(criteria: ManagerByIdCriteria): Promise<Manager> {
    return (
      await this.managerRepository.findOneOrFail({
        managerId: criteria.managerId,
      })
    ).toDomain();
  }
}
