import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { TeaHouseDIToken } from '../di/tea-house.token';
import {
  TeaHouseRegisterCommand,
  TeaHouseRegisterRequestCommand,
  TeaHouseUpdateCommand,
} from '../dto/tea-house.command';
import { TeaHouse } from '../entity/tea-house';
import { TeaHouseRepository } from '../repository/tea-house-category.repository';

@Injectable()
export class TeaHouseService {
  constructor(
    @Inject(TeaHouseDIToken.TeaHouseRepository)
    private readonly teaHouseRepository: TeaHouseRepository,
  ) {}
  // 차집 시스템 등록
  async createTeaHouse(command: TeaHouseRegisterCommand) {
    return await this.teaHouseRepository.store(command.toEntity());
  }

  // 차칩 등록 신청
  async requestRegisterTeaHouse(
    command: TeaHouseRegisterRequestCommand,
  ): Promise<TeaHouse> {
    const { teaHouseId, ...others } = command;

    if (teaHouseId) {
      const teaHouse = await this.teaHouseRepository
        .findById(teaHouseId)
        .catch((error: Error) => {
          if (error instanceof EntityNotFoundError) {
            return command.toEntity();
          } else {
            throw error;
          }
        });
      teaHouse.update(others);
      teaHouse.requestRegisterManager({
        managerId: command.managerId,
        businessLicenseCopy: command.businessLicenseCopy,
        isRepresentative: command.isRepresentative,
      });
      return await this.teaHouseRepository.store(teaHouse);
    } else {
      const teaHouse = command.toEntity();
      teaHouse.requestRegisterManager({
        managerId: command.managerId,
        businessLicenseCopy: command.businessLicenseCopy,
        isRepresentative: command.isRepresentative,
      });
      return await this.teaHouseRepository.store(teaHouse);
    }
  }

  // 차집 수정
  async updateTeaHouse(command: TeaHouseUpdateCommand) {
    const { teaHouseId, ...updateProperty } = command;
    const teaHouse = await this.teaHouseRepository.findById(command.teaHouseId);
    teaHouse.update({ ...updateProperty });
    return await this.teaHouseRepository.store(teaHouse);
  }

  // 차집 폐업
  async closeTeaHouse(teaHouseId: string) {
    const teaHouse = await this.teaHouseRepository.findById(teaHouseId);
    teaHouse.closeTeaHouse();
    return await this.teaHouseRepository.store(teaHouse);
  }
}
