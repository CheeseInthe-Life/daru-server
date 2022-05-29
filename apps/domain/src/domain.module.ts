import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';

@Module({
  imports: [],
  providers: [DomainService],
})
export class DomainModule {}
