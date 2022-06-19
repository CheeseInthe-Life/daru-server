import { Test, TestingModule } from '@nestjs/testing';
import { NotificationServiceImpl } from './notification.service';

describe('NotificationServiceImpl', () => {
  let service: NotificationServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationServiceImpl],
    }).compile();

    service = module.get<NotificationServiceImpl>(NotificationServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
