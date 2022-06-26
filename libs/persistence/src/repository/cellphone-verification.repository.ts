import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { CellphoneVerificationEntity } from '../entity/cellphone-verification.entity';

@EntityRepository(CellphoneVerificationEntity)
export class CellphoneVerificationRepository {
  constructor(
    @InjectRepository(CellphoneVerificationEntity)
    private readonly cellphoneVerificationRepository: Repository<CellphoneVerificationEntity>,
  ) {}

  async store(
    cellphoneVerificationEntity: CellphoneVerificationEntity,
  ): Promise<CellphoneVerificationEntity> {
    return this.cellphoneVerificationRepository.save(
      cellphoneVerificationEntity,
    );
  }

  async findCellphoneVerificationById({ id }: { id: number }) {
    return this.cellphoneVerificationRepository.findOneOrFail({ id });
  }
}
