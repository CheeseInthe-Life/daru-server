import { NotificationDIToken } from '@domain/domain/interface/di/notification.service.token';
import { NotificationService } from '@domain/domain/interface/service/notification.service';
import { ManagerDIToken } from '@domain/domain/manager/di/manager.token';
import { RegisterManagerCommand } from '@domain/domain/manager/dto/manager.command';
import { ManagerService } from '@domain/domain/manager/service/manager.service';
import { InfraDIToken } from '@infra/persistence';
import { CellphoneVerificationEntity } from '@infra/persistence/entity/cellphone-verification.entity';
import { CellphoneVerificationRepository } from '@infra/persistence/repository/cellphone-verification.repository';
import { LocalDateTime } from '@js-joda/core';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CellphoneVerificationExceptionMessage } from 'common/constant/error-message';
import { EntityNotFoundError } from 'typeorm';
import { VerifyCodeDto } from '../presentation/auth/api/auth.dto';

@Injectable()
export class AuthFacade {
  constructor(
    @Inject(ManagerDIToken.ManagerService)
    private readonly managerService: ManagerService,
    @Inject(NotificationDIToken.NotificationService)
    private readonly notificationService: NotificationService,
    @Inject(InfraDIToken.CellphoneVerificationRepository)
    private readonly cellphoneVerificationRepository: CellphoneVerificationRepository,
  ) {}

  async sendVerificationCode(
    cellphone: string,
  ): Promise<CellphoneVerificationEntity> {
    const RANDOM_CODE = this.generateRandomNumberString(6);
    const MESSAGE = `인증번호는 [${RANDOM_CODE}] 입니다`;

    await this.notificationService.sendSms({ to: cellphone, content: MESSAGE });

    return await this.cellphoneVerificationRepository.store(
      CellphoneVerificationEntity.of({
        cellphone,
        verificationCode: RANDOM_CODE,
      }),
    );
  }

  async verifyCode({
    requestId,
    verificationCode,
  }: VerifyCodeDto): Promise<CellphoneVerificationEntity> {
    const NOW = LocalDateTime.now();
    const cellphoneVerification = await this.cellphoneVerificationRepository
      .findCellphoneVerificationById({
        id: requestId,
      })
      .catch((error: Error) => {
        if (error instanceof EntityNotFoundError) {
          return null;
        } else {
          throw error;
        }
      });

    if (!cellphoneVerification) {
      throw new BadRequestException(
        CellphoneVerificationExceptionMessage.notFound,
      );
    }

    if (cellphoneVerification.isExpired(NOW)) {
      throw new BadRequestException(
        CellphoneVerificationExceptionMessage.expired,
      );
    }

    if (cellphoneVerification.verificationCode !== verificationCode) {
      throw new BadRequestException(
        CellphoneVerificationExceptionMessage.invalid,
      );
    }

    cellphoneVerification.verifiedCode(NOW);

    return await this.cellphoneVerificationRepository.store(
      cellphoneVerification,
    );
  }

  async signUp(command: RegisterManagerCommand): Promise<any> {
    return await this.managerService.registerManager(command);
  }

  private generateRandomNumberString(length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += '0123456789'.charAt(Math.floor(Math.random() * 10));
    }
    return result;
  }
}
