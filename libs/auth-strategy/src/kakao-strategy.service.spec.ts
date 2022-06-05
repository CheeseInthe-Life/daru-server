import { Test, TestingModule } from '@nestjs/testing';
import { KakaoStrategy } from './kakao-strategy.service';

describe('KakaoStrategy', () => {
  let service: KakaoStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KakaoStrategy],
    }).compile();

    service = module.get<KakaoStrategy>(KakaoStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
